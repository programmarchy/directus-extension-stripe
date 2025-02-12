import Stripe from 'stripe';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { Application } from 'express';
import { defineHook } from '@directus/extensions-sdk';
import stripeFields from '../constants/fields';
import stripeRelations from '../constants/relations';

type StripeSettings = {
  stripe_secret_key: string | null;
  stripe_webhook_user: StripeWebhookUser | null;
  stripe_webhooks: StripeWebhook[];
};

type StripeWebhookUser = {
  id: string;
  role: {
    id: string;
    policies: {
      policy: {
        app_access: boolean;
        admin_access: boolean;
      };
    }[];
  },
};

type StripeWebhook = {
  path?: string;
  secret?: string;
  verify_signature?: boolean | null;
};

class StripeWebhookError extends Error {
  status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export default defineHook(({ init }, { env, database, services, logger, getSchema }) => {
  const { SettingsService, FieldsService, RelationsService } = services;

  init('app.before', async () => {
    const fieldsService = new FieldsService({
      knex: database,
      schema: await getSchema({
        database,
      })
    });

    for await (const field of stripeFields) {
      const exists = await fieldsService.readOne(field.collection, field.field).catch(() => null);
      if (!exists) {
        await fieldsService.createField(field.collection, field);
      }
    }

    const relationsService = new RelationsService({
      knex: database,
      schema: await getSchema({
        database,
      })
    });

    for await (const relation of stripeRelations) {
      const exists = await relationsService.readOne(relation.collection, relation.field).catch(() => null);
      if (!exists) {
        await relationsService.createOne(relation);
      }
    }
  });

  init('middlewares.before', ({ app }: Record<'app', Application>) => {
    app.use((req, res, next) => {
      let stripeSignature: string | undefined;
      let rawBody: string | undefined;

      bodyParser.json({
        verify: (req: any, _res, buf) => {
          stripeSignature = req.get('stripe-signature');
          if (stripeSignature) {
            rawBody = buf.toString();
          }
        }
      })(req, res, async () => {
        if (!(stripeSignature && rawBody)) {
          return next();
        }

        try {
          await handleStripeWebhook(req, rawBody, stripeSignature);
          next();
        } catch (error) {
          if (error instanceof StripeWebhookError) {
            return res.status(error.status).send({
              error: error.message,
            });
          } else {
            return res.status(500).send({
              error: (error as Error).message,
            });
          }
        }
      });
    });
  });

  async function handleStripeWebhook(req: any, rawBody: string, stripeSignature: string) {
    const schema = await getSchema({
      database,
    });
  
    const settingsService = new SettingsService({
      knex: database,
      schema,
    });
  
    const stripeSettings: StripeSettings = await settingsService.readSingleton({
      fields: [
        'stripe_secret_key',
        'stripe_webhook_user.id',
        'stripe_webhook_user.role.id',
        'stripe_webhook_user.role.policies.policy.app_access',
        'stripe_webhook_user.role.policies.policy.admin_access',
      ],
    });

    const stripeSecretKey = stripeSettings.stripe_secret_key || env['STRIPE_SECRET_KEY'];
    if (!stripeSecretKey) {
      throw new StripeWebhookError('Stripe secret key is not set.', 500);
    }

    const stripe = new Stripe(stripeSecretKey);

    const stripeWebhook = getStripeWebhookForPath(req.path, stripeSettings, env);
    if (!stripeWebhook) {
      throw new StripeWebhookError(`Stripe webhook path not found.`, 404);
    }

    if (stripeWebhook.verify_signature) {
      const { secret } = stripeWebhook;
      if (!secret) {
        throw new StripeWebhookError(`Stripe webhook secret is not set.`, 500);
      }
      req.stripeEvent = await stripe.webhooks.constructEventAsync(
        rawBody,
        stripeSignature,
        secret
      );
    } else {
      logger.warn('Stripe webhook signature verification is disabled.');
      req.stripeEvent = req.body;
    }

    const stripeWebhookUser = stripeSettings.stripe_webhook_user;
    if (!req.get('authorization') && stripeWebhookUser) {

      //check if any of the policies within the users role has app_access or admin_access
      const app_access = !!stripeWebhookUser.role.policies.find((policy) => policy.policy.app_access);
      const admin_access = !!stripeWebhookUser.role.policies.find((policy) => policy.policy.admin_access);

      const token = jwt.sign({
        id: stripeWebhookUser.id,
        role: stripeWebhookUser.role.id,
        app_access,
        admin_access,
      }, env['SECRET'] as string, {
        issuer: 'directus',
        expiresIn: env['ACCESS_TOKEN_TTL'],
      });
      req.headers['authorization'] = `Bearer ${token}`;
    }

    req.stripe = stripe;
  }
});

function getStripeWebhookForPath(path: string, settings: StripeSettings, env: Record<string, any>): StripeWebhook | undefined {
  if (settings.stripe_webhooks) {
    const stripeWebhook = settings.stripe_webhooks.find((webhook) => webhook.path === path);
    if (stripeWebhook) {
      return stripeWebhook;
    }
  }

  const stripeWebhookEnv = {
    path: env['STRIPE_WEBHOOK_PATH'],
    secret: env['STRIPE_WEBHOOK_SECRET'],
    verify_signature: env['STRIPE_WEBHOOK_VERIFY_SIGNATURE'] === true,
  };

  if (stripeWebhookEnv.path) {
    if (path === stripeWebhookEnv.path) {
      return stripeWebhookEnv;
    } else {
      return undefined;
    }
  } else {
    return stripeWebhookEnv;
  }
}
