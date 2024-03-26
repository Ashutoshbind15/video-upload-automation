import { getUserSubscriptionPlan } from "@/lib/apiHelpers/subscriptionplans";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentSubscription = await getUserSubscriptionPlan();
  return NextResponse.json(currentSubscription);
};
