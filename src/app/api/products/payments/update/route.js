import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();
  const customerId = data.customerId;
  const returnUrl = data.returnUrl;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return NextResponse.json(stripeSession.url);
};
