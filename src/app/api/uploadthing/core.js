import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Video from "@/models/Video";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "300MB" } })
    .input(z.object({ vid: z.string() }))
    .middleware(async ({ req, input }) => {
      console.log("req", input);

      const sess = await getServerSession(authOptions);

      const uid = sess?.user?.id;

      if (!sess || !uid) {
        throw new Error("Unauthorized");
      }

      return { uid, vid: input.vid };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.uid);
      console.log("Video id", metadata.vid);
      console.log("file url", file.url);

      await connectDB();

      // Update the video with the cloudUrl

      const vid = await Video.findById(metadata.vid);

      // check if user has made a request for the video before

      const existingRequest = vid.requests.find(
        (req) => req.uploader.toString() === metadata.uid
      );

      if (existingRequest) {
        existingRequest.cloudUrl = file.url;
      } else {
        vid.requests.push({
          uploader: metadata.uid,
          cloudUrl: file.url,
        });
      }

      await vid.save();
    }),
};
