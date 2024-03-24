"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/lib/hooks/queries";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data, status } = useSession();
  const { userData, isUserError, isUserLoading, userError } = useUser();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Unauthenticated</div>;
  }

  const user = userData;

  return (
    <div className="w-full">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>{user?.username}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>{user?._id}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
