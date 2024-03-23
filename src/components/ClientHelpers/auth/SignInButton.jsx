"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default SignInButton;
