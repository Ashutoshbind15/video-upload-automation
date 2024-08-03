"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/lib/hooks/queries";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data, status } = useSession();
  const { userData, isUserError, isUserLoading, userError } = useUser();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Unauthenticated...</div>;
  }

  const user = userData;

  return (
    <>
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>{user?.username}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="font-bold mb-4">Spaces</p>

            {user?.spaces?.length
              ? user?.spaces.map((space) => (
                  <div key={space._id}>
                    <p>{space.title}</p>
                    <p>{space.description}</p>
                  </div>
                ))
              : "You have not created any spaces yet."}
          </div>
        </CardContent>
        <CardFooter className="flex  items-center gap-x-8">
          <Button>Edit Profile</Button>
          <Button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Profile;
