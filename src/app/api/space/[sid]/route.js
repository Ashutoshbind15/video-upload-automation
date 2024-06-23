import { connectDB } from "@/lib/db";
import Space from "@/models/Space";
import Video from "@/models/Video";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async (req, { params }) => {
  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  console.log(params);
  const sid = params.sid;

  const userSpaces = await Space.find({
    $or: [{ admins: sess.user.id }, { editors: sess.user.id }],
  });

  if (!userSpaces.find((space) => space._id.toString() === sid)) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const space = await Space.findById(sid).populate([
    {
      path: "editors",
      select: "username email _id",
      model: User,
    },
    {
      path: "admins",
      select: "username email _id",
      model: User,
    },
    {
      path: "videos",
      model: Video,
      populate: {
        path: "requests",
        populate: {
          path: "uploader",
          model: "User",
          select: "username email _id",
        },
      },
    },
  ]);
  return NextResponse.json(space, { status: 200 });
};

export const PUT = async (req, { params }) => {
  await connectDB();

  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const userSpaces = await Space.find({
    $or: [{ admins: sess.user.id }, { editors: sess.user.id }],
  });

  if (!userSpaces.find((space) => space._id.toString() === params.sid)) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const sid = params.sid;
  const body = await req.json();

  const vtitle = body.title;
  const vdescription = body.description;
  const spaceId = sid;

  const video = new Video({
    title: vtitle,
    description: vdescription,
    space: spaceId,
  });

  await video.save();

  const space = await Space.findById(sid);

  space.videos.push(video._id);

  await space.save();

  return NextResponse.json(video, { status: 201 });
};
