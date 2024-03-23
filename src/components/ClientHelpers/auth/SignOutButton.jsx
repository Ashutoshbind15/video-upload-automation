"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const SignOutButton = () => {
  return <Button onClick={() => signOut()}>SignOutButton</Button>;
};

export default SignOutButton;
