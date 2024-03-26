import { fetchVideoFromUrl, uploadVideo } from "@/lib/apiHelpers/videoUploader";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  // dont implement like this
  await connectDB();
  const jsonBody = await req.json();

  const { url, accessToken } = jsonBody;

  console.log(url);
  console.log(accessToken);

  const video = await fetchVideoFromUrl(url);

  await uploadVideo(accessToken, video);

  return NextResponse.json({ success: true }, { status: 200 });
};
