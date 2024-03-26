import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchVideoFromUrl, uploadVideo } from "@/lib/apiHelpers/videoUploader";
import { connectDB } from "@/lib/db";
import Account from "@/models/Account";
import User from "@/models/User";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const body = await req.json();

  const { vid } = params;
  const { requestId } = body;
  await connectDB();

  const video = await Video.findById(vid);

  const request = video.requests.find(
    (req) => req._id.toString() === requestId
  );

  const requestIdx = video.requests.findIndex(
    (req) => req._id.toString() === requestId
  );

  const cloudUrl = request.cloudUrl;

  const sess = await getServerSession(authOptions);
  const uid = sess?.user?.id;
  const user = await User.findOne({ _id: uid }).populate([
    { path: "accounts", model: Account },
  ]);

  console.log("user", user);

  const accessToken = user.accounts[0].accessToken;

  const videoFile = await fetchVideoFromUrl(cloudUrl);
  const response = await uploadVideo(accessToken, videoFile);

  video.requests[requestIdx].approved = true;
  await video.save();

  console.log("response", response);

  return NextResponse.json({ success: true }, { status: 200 });
};
