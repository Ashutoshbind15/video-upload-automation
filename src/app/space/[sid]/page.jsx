"use client";

import Uploader from "@/components/Video/Uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSpace } from "@/lib/hooks/queries";
import axios from "axios";
import { useState } from "react";

const SpacePage = ({ params }) => {
  const { sid } = params;

  const { isSpaceError, isSpaceLoading, spaceData, spaceError } = useSpace(sid);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  console.log(spaceData);

  const admin = spaceData?.admins[0];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{spaceData?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{spaceData?.description}</p>

          <div className="mt-3">
            <h3>Editors</h3>
            <ul>
              {spaceData?.editors.map((editor) => (
                <li key={editor._id}>
                  {editor.username} : {editor.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="my-3">
            <Dialog>
              <DialogTrigger>Add Video</DialogTrigger>
              <DialogContent className="p-16">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("submit");
                    console.log(videoTitle, videoDescription);

                    await axios.put(`/api/space/${sid}`, {
                      title: videoTitle,
                      description: videoDescription,
                    });
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
          </div>

          <div className="my-3">
            <h3>Videos</h3>
            <ul>
              {spaceData?.videos.map((video) => {
                return (
                  <div key={video?._id}>
                    <li key={video._id}>
                      {video.title} : {video.description}
                    </li>
                    <Uploader vid={video._id} />

                    <div className="my-3">
                      <h3>Requests</h3>
                      <ul>
                        {video.requests.map((req) => {
                          if (!req.approved)
                            return (
                              <div key={req._id}>
                                <li>
                                  {req.uploader.username} : {req.cloudUrl}
                                </li>

                                <Button
                                  onClick={() => {
                                    axios.post(
                                      `/api/video/${video._id}/approve`,
                                      {
                                        requestId: req._id,
                                      }
                                    );
                                  }}
                                >
                                  Approve
                                </Button>
                              </div>
                            );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <p>Created by: {admin?.username}</p>
          <p className="font-light">: {admin?.email}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpacePage;
