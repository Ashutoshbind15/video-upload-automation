"use client";

import { useEffect, useState } from "react";

const AccountPlan = () => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const response = await fetch("/api/profile/plan");
      const data = await response.json();
      setPlan(data);
    };

    fetchPlan();
  }, []);

  return <div>{JSON.stringify(plan, null, 2)}</div>;
};

export default AccountPlan;
