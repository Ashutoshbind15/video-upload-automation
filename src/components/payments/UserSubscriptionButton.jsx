"use client";
import { Button } from "../ui/button";
import axios from "axios";

const UserSubscriptionButton = ({
  isCurrentPlan,
  isSubscribed,
  stripePriceId,
  stripeCustomerId,
}) => {
  return (
    <div>
      <Button
        onClick={async () => {
          if (isCurrentPlan && isSubscribed && stripeCustomerId) {
            const { data } = await axios.post(`/api/products/payments/update`, {
              customerId: stripeCustomerId,
              returnUrl: window.location.href,
            });

            window.location.assign(data);
          } else {
            const { data } = await axios.post(`/api/products/payments`, {
              priceId: stripePriceId,
            });

            window.location.assign(data);
          }
        }}
      >
        {isCurrentPlan ? "Manage Plan" : "Subscribe"}
      </Button>
    </div>
  );
};

export default UserSubscriptionButton;
