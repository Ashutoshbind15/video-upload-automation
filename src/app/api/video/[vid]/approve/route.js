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
    { path: "lastModifiedAccount", model: Account },
  ]);

  if (!user) {
    return NextResponse.json({ msg: "No user found" }, { status: 401 });
  }

  if (!user.lastModifiedAccount) {
    return NextResponse.json(
      { msg: "No account linked to user found" },
      { status: 401 }
    );
  }

  const accessToken = user.lastModifiedAccount.accessToken;
  const videoFile = await fetchVideoFromUrl(cloudUrl);

  console.log(accessToken, "accessToken");
  console.log(videoFile, "videoFile");

  const response = await uploadVideo(accessToken, videoFile);

  if (!response) {
    return NextResponse.json(
      { msg: "Failed to upload video" },
      { status: 500 }
    );
  }

  video.requests[requestIdx].approved = true;
  video.requests[requestIdx].providerUploadProgress = 100;
  video.requests[
    requestIdx
  ].providerUrl = `https://www.youtube.com/watch?v=${response.id}`;
  console.log("response", response);
  await video.save();

  return NextResponse.json(
    { success: true, videoUploadId: response.id },
    { status: 200 }
  );
};
