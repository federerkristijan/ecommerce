import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  // load imported Stripe if stripePromsie doesn't exist
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHE_KEY);
  }

  return stripePromise;
}

export default getStripe;
