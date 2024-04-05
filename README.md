# directus-extension-stripe

A Directus extension that allows you to build flows and custom endpoints to handle Stripe Webhooks and make Stripe API calls. The best part is that it's fully integrated with Directus accountability and permissions. It's a small but mighty extension if you are looking to integrate Stripe! 

https://github.com/programmarchy/directus-extension-stripe/assets/622192/0cdc92eb-375d-4f16-945a-43d561c3a80a

## Details

This is a bundle extension that contains a middleware hook that [verifies the `Stripe-Signature` header](https://docs.stripe.com/webhooks#verify-webhook-signatures-with-official-libraries), and an operation node that injects the Stripe secret key into a flow so you can make API requests with the request node e.g. `GET https://{{stripe_secret_key}}:@api.stripe.com/v1/customers/{{stripe_customer_id}}`.

## Setup Instructions

Once you've [installed the extension](https://docs.directus.io/extensions/installing-extensions.html), to connect Stripe, you can either set the following environment variables:

- `STRIPE_SECRET_KEY`: Your [Stripe secret key](https://dashboard.stripe.com/apikeys) (e.g. `sk_...`)
- `STRIPE_WEBHOOK_PATH`: The path to your [webhook](https://dashboard.stripe.com/webhooks), relative to your Directus base URL (e.g. `/flows/triggers/...`)
- `STRIPE_WEBHOOK_SECRET`: Your webhook's secret (e.g. `whsec_...`)

Or you can configure these variables on the Settings page in Directus:

<img width="1552" alt="Settings" src="https://github.com/programmarchy/directus-extension-stripe/assets/622192/985960ef-cb10-4763-aa67-e946df38a006">

**NOTE**: In order for the settings to appear and for the middleware hook to be installed, you must restart your Directus instance after installing the extension. This is because they rely on the `app.before` and `middleware.before` events which only occur when Directus starts.

### Marketplace

Currently, this extension is not sandboxed so it won't appear in the Directus Marketplace by default. However, you can set `MARKETPLACE_TRUST="all"` so the extension becomes visible.
