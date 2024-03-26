import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users, { status: 200 });
};
