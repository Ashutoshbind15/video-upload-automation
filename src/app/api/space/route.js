import Space from "@/models/Space";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";

export const POST = async (req) => {
  await connectDB();
  const body = await req.json();

  const sess = await getServerSession(authOptions);

  const uid = sess?.user?.id;

  if (!sess || !uid) {
    const loginUrl = new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const { title, description, selectedUsers } = body;

  const space = new Space({
    title,
    description,
    editors: selectedUsers,
    admins: [uid],
  });

  await space.save();

  return NextResponse.json(
    { msg: "Space created successfully" },
    { status: 201 }
  );
};

export const GET = async (req) => {
  const sess = await getServerSession(authOptions);
  const uid = sess?.user?.id;

  if (!sess || !uid) {
    const loginUrl = new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  await connectDB();
  const spaces = await Space.find({
    $or: [{ admins: uid }, { editors: uid }],
  }).populate([
    {
      path: "editors",
      model: User,
      select: "username",
    },
    {
      path: "admins",
      model: User,
      select: "username",
    },
    {
      path: "videos",
      model: Video,
    },
  ]);

  return NextResponse.json(spaces, { status: 200 });
};
