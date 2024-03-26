import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
  typescript: true,
});

export const subscriptionPlans = [
  {
    id: "standard",
    name: "Standard",
    description: "Standard plan for our services",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID ?? "",
    price: 1000,
    features: ["Spaces (5)", "Editors/space (5)", "Storage (200GB)"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Premium plan for our services with additional features",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
    price: 2000,
    features: ["Spaces (10)", "Editors/space (10)", "Storage (500GB)"],
  },
];
