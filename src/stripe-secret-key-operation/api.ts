import { defineOperationApi } from '@directus/extensions-sdk';

type Options = {};

type StripeSettings = {
  stripe_secret_key: string | null;
};

export default defineOperationApi<Options>({
	id: 'stripe-secret-key',
	handler: async ({}, { env, database, services, getSchema }) => {
		const { SettingsService } = services;

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
      ],
    });

    const stripeSecretKey = stripeSettings.stripe_secret_key || env['STRIPE_SECRET_KEY'];
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not set.');
    }

		return stripeSecretKey;
	},
});
