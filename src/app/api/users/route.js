import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async (req, { params }) => {
  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  await connectDB();

  // find the top 10 users whose username or email contains the query

  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  })
    .limit(10)
    .select("username email role")
    .exec();

  return NextResponse.json(users, { status: 200 });
};
