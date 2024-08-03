import { connectDB } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const data = await req.json();
  const { vid } = params;
  const requestId = data.requestId;
  const sender = data.sender;
  const text = data.text;

  console.log("data", data);

  await connectDB();

  const video = await Video.findById(vid);
  const requestIdx = video.requests.findIndex(
    (req) => req._id.toString() === requestId
  );

  video.requests[requestIdx].approved = 1;

  video.requests[requestIdx].chats.push({
    sender: sender,
    text: text,
  });

  const lastChat =
    video.requests[requestIdx].chats[
      video.requests[requestIdx].chats.length - 1
    ];

  await video.save();

  return NextResponse.json(lastChat, { status: 200 });
};
