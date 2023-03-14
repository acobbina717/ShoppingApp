import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  String(process.env.STRIPE_PUBLISHABLE_KEY)
);
