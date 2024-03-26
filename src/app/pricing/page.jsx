"use client";

import SignInButton from "@/components/ClientHelpers/auth/SignInButton";
import UserSubscriptionButton from "@/components/payments/UserSubscriptionButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/lib/stripe";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PircingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const sess = useSession();
  const session = sess.data;

  const [subscriptionPlan, setSubscriptionPlan] = useState(null);

  useEffect(() => {
    if (session?.user) {
      axios
        .get(`/api/profile/plan`)
        .then(({ data }) => setSubscriptionPlan(data));
    }
  }, [session]);

  return (
    <div className="flex items-center justify-around w-full pt-20">
      {/* Free Card */}

      <Card className="mx-4 w-1/4 h-96 mb-20 flex flex-col justify-around">
        <CardHeader>
          <CardTitle className="">Free</CardTitle>
          <CardDescription>Get started with our free tier</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="my-3">
            <li className="flex items-center gap-x-4 my-1">
              <CheckCircle className="w-6 h-6" />
              <span>Spaces (2)</span>
            </li>
            <li className="flex items-center gap-x-4 my-1">
              <CheckCircle className="w-6 h-6" />
              <span>Editors/space (3)</span>
            </li>
            <li className="flex items-center gap-x-4 my-1">
              <CheckCircle className="w-6 h-6" />
              <span>Storage (2GB)</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>

      {subscriptionPlans.map((plan) => (
        <Card
          key={plan.id}
          className="w-1/4 mx-4 h-96 mb-20 flex flex-col justify-around"
        >
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="my-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-x-4 my-1">
                  <CheckCircle className="w-6 h-6" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="flex items-end">
            {session?.user ? (
              <UserSubscriptionButton
                stripePriceId={plan.stripePriceId}
                stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                isSubscribed={!!subscriptionPlan?.isSubscribed}
                isCurrentPlan={subscriptionPlan?.name === plan.name}
              />
            ) : (
              <SignInButton />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PircingPage;
