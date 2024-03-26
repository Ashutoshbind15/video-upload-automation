import { connectDB } from "@/lib/db";
import Space from "@/models/Space";
import Video from "@/models/Video";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectDB();
  console.log(params);
  const sid = params.sid;

  const space = await Space.findById(sid).populate([
    {
      path: "editors",
      select: "username email -_id",
      model: User,
    },
    {
      path: "admins",
      select: "username email -_id",
      model: User,
    },
    {
      path: "videos",
      model: Video,
    },
  ]);
  return NextResponse.json(space, { status: 200 });
};

export const PUT = async (req, { params }) => {
  await connectDB();
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
