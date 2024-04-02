# example

The code in this folder is for example purposes only. To run the example on your own, you will need to set up your own Stripe account, and make edits to the example to match your own Stripe information.

## client

You will need to the client code using your own Stripe information.

Create your own Stripe pricing table here:

https://dashboard.stripe.com/test/pricing-tables/create

Then, copy the embed script into `client/index.html`.

To run the local client:

```
cd client
npm install
npm start
```

## directus

This is an SQLite-backed Directus instance.

Edit `directus/.env` and configure the "Email" section if you want to send emails.

You'll need the following from Stripe:

- Your secret key in [API keys](https://dashboard.stripe.com/test/apikeys)
- A webhook secret in [Webhooks](https://dashboard.stripe.com/test/webhooks)
  - If deploying remotely, add a hosted endpoint
  - Or run locally with the Stripe CLI:

```
stripe listen --forward-to http://localhost:8055/flows/trigger/971a67ca-50c7-42f5-88d6-77b24e021b45 --events checkout.session.completed
```

- A [Stripe product](https://dashboard.stripe.com/test/products?active=true) (e.g. a Chocolate Chip Cookies Recipe)

To run the example Directus instance:

```
cd directus
npm install
npm start
```

Log in with `admin@example.com` / `password`.

You'll need to make the following edits:

- In [Settings > Stripe](http://localhost:8055/admin/settings/project):
  - Set your Stripe Secret Key (`sk_...`)
  - Set your Stripe Webhooks > Secret (`whsec_...`)

- In [Recipes](http://localhost:8055/admin/content/recipes):
  - Set your Stripe Product ID (`prod_...`)

At this point, you should be able to make purchases on Stripe from the example client, and see the effects on the Directus instance.
