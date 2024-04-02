# directus-extension-stripe

This Directus extension enables you to build flows to handle Stripe webhooks, including support for verifying the Stripe webhook signature and Directus accountability tracking!

## Details

- This project handles the tricky part of verifying a Stripe webhook by adding middleware to check the signature against the raw body.
- Optionally, the middleware executes the Stripe webhook request as a Directus user, which allows you to control what the webhook can read and modify using Directus permissions, and track and log any data modified by the webhook.
- The middleware verifies Stripe webhooks requests that can be fed into a Directus flow (with a webhook trigger) or a custom Directus endpoint extension.
- The Stripe JavaScript SDK is used.
- I built a hook extension for the middleware, and a very simple operation that allows you to inject the Stripe secret key into your flow so you can use it in a Request operation to Stripe.
- If given longer, I'd build out a more featured Stripe operation node that makes it easier to build Stripe requests.

## Set Up Instructions

Simply put the extension in your extensions directory. You can either put your Stripe secrets in these environment variables:

- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_WEBHOOK_PATH

Or configure these properties in the Directus Settings page.

## Screenshots

<img width="1552" alt="flow" src="https://github.com/programmarchy/directus-extension-stripe/assets/622192/03cb3f74-62df-48f2-bd43-4b33b521077d">

<img width="1552" alt="settings" src="https://github.com/programmarchy/directus-extension-stripe/assets/622192/ea5d7441-058c-4e0b-b9bf-acd05c40bbb3">

## Collaborators

- programmarchy
