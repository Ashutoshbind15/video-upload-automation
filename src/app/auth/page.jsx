"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [singIn, setSignIn] = useState(true);

  return (
    <div
      className={`h-screen items-center justify-center flex ${
        singIn ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Sign in form */}

      <Image
        src={"/images/lsauthpage.webp"}
        width={500}
        height={500}
        alt="authimage"
      />

      <div className="w-1/2 flex flex-col">
        {singIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
              });
            }}
            className="flex flex-col gap-y-6 items-center"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-3/4"
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-3/4"
            />

            <Button type="submit" className="my-2 w-1/2">
              Submit
            </Button>
            <Button
              onClick={() => setSignIn(!singIn)}
              className="my-2 w-1/2"
              type="button"
            >
              {singIn ? "Sign up" : "Sign in"}
            </Button>
          </form>
        )}

        {!singIn && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const { data } = await axios.post("/api/signup", {
                email,
                password,
                username,
              });

              signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
              });
            }}
            className="flex flex-col gap-y-6 items-center"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-3/4"
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-3/4"
            />

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-3/4"
            />

            <Button type="submit" className="my-2 w-1/2">
              Submit
            </Button>
            <Button
              onClick={() => setSignIn(!singIn)}
              className="my-2 w-1/2"
              type="button"
            >
              {singIn ? "Sign up" : "Sign in"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
