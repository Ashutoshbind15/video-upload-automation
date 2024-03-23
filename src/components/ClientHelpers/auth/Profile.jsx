"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const { user, accessToken } = data;

  console.log(user);
  console.log(accessToken);

  return (
    <div className="w-full">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>{user?.id}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
