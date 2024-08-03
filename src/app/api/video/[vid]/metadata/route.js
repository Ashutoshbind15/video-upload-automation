import Video from "@/models/Video";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { vid } = params;
  const video = await Video.findById(vid);
  const data = await req.json();

  video.metadata = data;
  await video.save();

  console.log(video);

  return NextResponse.json(video.metadata, { status: 200 });
};
