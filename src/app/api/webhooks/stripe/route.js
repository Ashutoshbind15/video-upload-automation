import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { stripe } from "@/lib/stripe";

export const POST = async (req) => {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Webhook signature verification failed",
      },
      {
        status: 400,
      }
    );
  }

  const session = event.data.object;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const user = await User.findById(session.metadata.userId);

    user.stripeSubscriptionId = subscription.id;
    user.stripeCustomerId = subscription.customer;
    user.stripePriceId = subscription.items.data[0].price.id;
    user.stripeCurrentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    );

    await user.save();

    console.log("🚀 Checkout sess complete");
    console.log(subscription);
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    // Update the price id and set the new period end

    const user = await User.findOne({
      stripeSubscriptionId: subscription.id,
    });

    user.stripePriceId = subscription.items.data[0].price.id;
    user.stripeCurrentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    );

    await user.save();

    console.log("🚀 Invoice payment success");
    console.log(subscription);
  }

  return NextResponse.json({ received: true });
};
