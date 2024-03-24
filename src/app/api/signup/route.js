import User from "@/models/User";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const jsonBody = await req.json();
  const { email, password, username } = jsonBody;
  const randomSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, randomSalt);

  const user = new User({
    email,
    password: hashedPassword,
    salt: randomSalt,
    username,
  });

  await user.save();

  return NextResponse.json(
    { msg: "User created successfully" },
    {
      status: 201,
    }
  );
};
