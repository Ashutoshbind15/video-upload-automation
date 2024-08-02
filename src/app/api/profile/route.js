import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import Space from "@/models/Space";
import Account from "@/models/Account";

export const GET = async (req) => {
  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ msg: "No session found" }, { status: 401 });
  }

  await connectDB();

  const uid = sess.user.id;

  const user = await User.findById(uid)
    .select("-password -salt")
    .populate([
      {
        path: "spaces",
        model: Space,
      },
      {
        path: "accounts",
        model: Account,
        select: "-accessToken -refreshToken -accountId -userId -_id",
      },
      {
        path: "lastModifiedAccount",
        model: Account,
        select: "-accessToken -refreshToken -accountId -userId -_id",
      },
    ]);

  return NextResponse.json(user, { status: 200 });
};
