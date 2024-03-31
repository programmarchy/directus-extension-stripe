import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'stripe-secret-key',
	name: 'Stripe Secret Key',
	icon: 'attach_money',
	description: 'Returns the Stripe secret key configured for this project.',
	overview: () => [],
	options: [{}],
});
