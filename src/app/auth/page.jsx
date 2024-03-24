"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [singIn, setSignIn] = useState(true);

  return (
    <div className="h-screen items-center justify-center flex flex-col">
      {/* Sign in form */}

      <div className="w-full">
        {singIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("sign in");
              console.log(email, password);

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
          </form>
        )}

        {!singIn && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("sign up");

              const { data } = await axios.post("/api/signup", {
                email,
                password,
                username,
              });

              console.log(data);

              signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
              });

              console.log(email, password, username);
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
          </form>
        )}
      </div>

      <Button onClick={() => setSignIn(!singIn)} className="my-2 w-1/2">
        {singIn ? "Sign up" : "Sign in"}
      </Button>
    </div>
  );
};

export default AuthPage;
