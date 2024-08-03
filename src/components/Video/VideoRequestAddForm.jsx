"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";

const VideoRequestAddForm = ({ sid, refetchSpace }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Video</Button>
      </DialogTrigger>
      <DialogContent className="p-16">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await axios.put(`/api/space/${sid}`, {
              title: videoTitle,
              description: videoDescription,
            });

            toast("Video request added");
            refetchSpace();
          }}
          className="gap-y-4 flex flex-col"
        >
          <Input
            type="text"
            placeholder="Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />

          <Button type="submit">Add Video</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VideoRequestAddForm;
