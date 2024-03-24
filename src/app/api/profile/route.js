import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const GET = async (req) => {
  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ msg: "No session found" }, { status: 401 });
  }

  const uid = sess.user.id;

  const user = await User.findById(uid).select("-password -salt");

  return NextResponse.json(user, { status: 200 });
};
