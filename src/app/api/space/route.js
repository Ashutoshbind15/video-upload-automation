import Space from "@/models/Space";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/lib/db";

export const POST = async (req) => {
  await connectDB();
  const body = await req.json();

  const sess = await getServerSession(authOptions);

  const uid = sess?.user?.id;

  if (!sess || !uid) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
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

export const GET = async () => {
  await connectDB();
  const spaces = await Space.find();

  return NextResponse.json(spaces, { status: 200 });
};
