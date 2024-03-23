"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadVideo } from "@/lib/apiHelpers/videoUploader";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const VideoUploader = () => {
  const [videoFile, setVideoFile] = useState(null);

  const { data } = useSession();

  const accessToken = data?.accessToken;

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  console.log(videoFile);

  return (
    <div>
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        onChange={(e) => {
          handleFileChange(e);
        }}
      />

      {videoFile && (
        <Button
          onClick={() => {
            console.log(videoFile);
            uploadVideo(accessToken, videoFile);
          }}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default VideoUploader;
