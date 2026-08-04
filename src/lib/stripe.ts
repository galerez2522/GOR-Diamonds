import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;

export const stripe = key
  ? new Stripe(key, {
      // Pinned to the SDK's current default; cast keeps us forward-compatible.
      apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
      typescript: true,
    })
  : (null as unknown as Stripe);
