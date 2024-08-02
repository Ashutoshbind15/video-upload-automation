"use client";

import AlertBlocker from "@/components/Layout/AlertBlocker";
import Uploader from "@/components/Video/Uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpace } from "@/lib/hooks/queries";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const isAdmin = (space, session) => {
  console.log(space.admins, session.user.id);
  return space.admins.some((admin) => admin._id === session.user.id);
};

const isEditor = (space, session) => {
  return space.editors.some((editor) => editor._id === session.user.id);
};

const SpacePage = ({ params }) => {
  const { sid } = params;

  const { isSpaceError, isSpaceLoading, spaceData, spaceError, refetchSpace } =
    useSpace(sid);
  const [user, setUser] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const [dummyProgress, setDummyProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (isSpaceLoading) return <p>Loading...</p>;

  if (isSpaceError) return <p>Error: {spaceError.message}</p>;

  if (spaceData?.msg === "Unauthorized") {
    return (
      <div className="p-20 flex flex-col gap-y-6">
        <p>Unauthorized</p>

        <Link href="/space" asChild>
          <Button>Back to Spaces</Button>
        </Link>
      </div>
    );
  }

  const admin = spaceData?.admins[0];

  return (
    <div>
      <Card className="flex flex-col items-center w-full pt-12 pb-4 px-16">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {spaceData?.title}
          </CardTitle>
          <CardDescription className="text-xl">
            {spaceData?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-1/2 ">
          <div className="my-12 flex items-center justify-between">
            <h3 className="text-2xl">Editors</h3>
            <ul className="flex -space-x-4">
              {spaceData?.editors.map((editor, index) => (
                <Dialog key={editor._id}>
                  <DialogTrigger asChild>
                    <div
                      key={editor._id}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center hover:cursor-pointer hover:shadow-lg"
                      style={{ zIndex: spaceData?.editors?.length - index }}
                    >
                      {editor?.username?.length && editor?.username[0]}
                    </div>
                  </DialogTrigger>

                  <DialogContent className="p-16">
                    <p>{editor.username}</p>
                    <p>{editor.email}</p>
                  </DialogContent>
                </Dialog>
              ))}
            </ul>
          </div>
          <div className="my-12 flex items-center justify-between">
            <h3 className="text-2xl">Admins</h3>
            <ul className="flex -space-x-4">
              {spaceData?.admins.map((editor, index) => (
                <Dialog key={editor._id}>
                  <DialogTrigger asChild>
                    <div
                      key={editor._id}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center hover:cursor-pointer hover:shadow-lg"
                      style={{ zIndex: spaceData?.admins?.length - index }}
                    >
                      {editor?.username?.length && editor?.username[0]}
                    </div>
                  </DialogTrigger>

                  <DialogContent className="p-16">
                    <p>{editor.username}</p>
                    <p>{editor.email}</p>
                  </DialogContent>
                </Dialog>
              ))}
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-center">Videos</h3>
          <div className="my-3 rounded-lg border-2 border-slate-200 pb-4">
            <Tabs className="flex flex-col max-h-screen overflow-y-auto">
              <TabsList className="self-stretch flex items-center justify-around">
                <TabsTrigger value="requested" className="flex-1">
                  Requested
                </TabsTrigger>
                {isAdmin(spaceData, session) && (
                  <>
                    <TabsTrigger value="approved" className="flex-1">
                      Approved
                    </TabsTrigger>
                    <TabsTrigger value="uploaded" className="flex-1">
                      Uploaded
                    </TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="requested" className="px-4 py-6">
                <ul>
                  {spaceData?.videos.map((video) => {
                    const approved = video.requests.find((req) => req.approved);

                    if (!approved)
                      return (
                        <div
                          key={video?._id}
                          className="text-center border-y-2 border-slate-100 py-3"
                        >
                          <div className="my-4">
                            <p className="text-2xl font-semibold">
                              {video.title}
                            </p>
                            <p className="text-lg font-light">
                              {video.description}
                            </p>
                          </div>

                          {isAdmin(spaceData, session) && (
                            <div className="mt-3 mb-6">
                              <h3 className="text-xl font-semibold mb-3">
                                Requests
                              </h3>
                              <ul>
                                {video.requests.map((req) => {
                                  if (!req.approved)
                                    return (
                                      <div
                                        key={req._id}
                                        className="flex items-center justify-between px-8 border-y-2 border-slate-100 py-3"
                                      >
                                        <div className="flex flex-col items-center">
                                          <li>{req.uploader.username}</li>
                                          <li>{req.uploader.email}</li>
                                        </div>

                                        {!isUploading ? (
                                          <div className="flex items-center gap-x-4">
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                <Button>Preview</Button>
                                              </DialogTrigger>
                                              <DialogContent className="p-16">
                                                <div>
                                                  {req.uploader.username}
                                                </div>
                                                <div>{req.uploader.email}</div>
                                                <div>{req.cloudUrl}</div>
                                                <div>
                                                  {JSON.stringify(
                                                    req.metadata,
                                                    null,
                                                    2
                                                  )}
                                                </div>
                                              </DialogContent>
                                            </Dialog>
                                            <Button
                                              onClick={() => {
                                                signIn("google", {
                                                  callbackUrl: `/space/${sid}`,
                                                });
                                              }}
                                            >
                                              SignIn
                                            </Button>

                                            {user?.lastModifiedAccount && (
                                              <AlertBlocker
                                                onSuccess={async () => {
                                                  setIsUploading(true);
                                                  const { data } =
                                                    await axios.post(
                                                      `/api/video/${video._id}/approve`,
                                                      {
                                                        requestId: req._id,
                                                      }
                                                    );
                                                  console.log(data);

                                                  setIsUploading(false);
                                                  refetchSpace();
                                                }}
                                                confirmToastText={
                                                  "Video approved"
                                                }
                                                warningText={`Approve ${req.uploader.username}'s video request?`}
                                                warningTitle={"Approve Video"}
                                                btnText={"Approve"}
                                              >
                                                {user?.accounts?.length
                                                  ? user?.accounts?.map(
                                                      (acc, idx) => (
                                                        <div
                                                          key={idx}
                                                          className="my-2 py-2 border-y-2 border-gray-300 flex justify-between items-center"
                                                        >
                                                          <div>
                                                            <p>
                                                              {acc.provider}
                                                            </p>
                                                            <p>
                                                              {acc.accountEmail}
                                                            </p>
                                                          </div>
                                                          {user
                                                            ?.lastModifiedAccount
                                                            ?.accountEmail ===
                                                            acc.accountEmail && (
                                                            <div className="flex items-center gap-x-2">
                                                              <p>Selected</p>
                                                              <CheckCircle className="text-green-500" />
                                                            </div>
                                                          )}
                                                        </div>
                                                      )
                                                    )
                                                  : null}
                                              </AlertBlocker>
                                            )}
                                          </div>
                                        ) : (
                                          <div>Uploading...</div>
                                        )}
                                      </div>
                                    );
                                })}
                              </ul>
                            </div>
                          )}

                          {isEditor(spaceData, session) &&
                          !video.requests.find(
                            (req) => req.uploader._id === session.user.id
                          ) ? (
                            <Uploader
                              vid={video._id}
                              refetchSpace={refetchSpace}
                            />
                          ) : (
                            video.requests.find(
                              (req) => req.uploader._id === session.user.id
                            ) && (
                              <div className="flex items-center justify-between">
                                <p>Waiting for approval</p>
                                {/* reupload button */}
                              </div>
                            )
                          )}
                        </div>
                      );
                  })}
                </ul>
              </TabsContent>
              {isAdmin(spaceData, session) && (
                <TabsContent value="approved">
                  <ul>
                    {spaceData?.videos.map((video) => {
                      const approved = video.requests.find(
                        (req) =>
                          req.approved && req.providerUploadProgress < 100
                      );

                      if (approved)
                        return (
                          <div
                            key={video?._id}
                            className="flex items-center justify-between p-5"
                          >
                            <div>
                              <p className="text-xl font-semibold">
                                {approved.uploader.username}
                              </p>
                              <p className="text-lg font-light">
                                {approved.uploader.email}
                              </p>

                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={approved.cloudUrl}
                                className="underline"
                              >
                                Cloud Video Preview
                              </a>
                            </div>
                            <Progress value={dummyProgress} className="w-1/3" />
                          </div>
                        );
                    })}
                  </ul>
                </TabsContent>
              )}
              <TabsContent value="uploaded">
                <ul>
                  {spaceData?.videos.map((video) => {
                    const uploaded = video.requests.find(
                      (req) =>
                        req.approved && req.providerUploadProgress === 100
                    );

                    if (uploaded)
                      return (
                        <div
                          key={video?._id}
                          className="border-y-2 py-3 px-6 mb-3 flex items-center justify-between"
                        >
                          <div>
                            <div>
                              <p className="text-xl font-semibold">
                                {video.title}
                              </p>
                              <p className="text-lg font-light">
                                {video.description}
                              </p>
                            </div>

                            <div>
                              <p className="text-xl font-semibold">
                                {uploaded.uploader.username}
                              </p>
                              <p className="text-lg font-light">
                                {uploaded.uploader.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-y-2">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={uploaded.cloudUrl}
                              className="underline"
                            >
                              Cloud Video Preview
                            </a>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={uploaded.providerUrl}
                              className="underline"
                            >
                              Provider Video Preview
                            </a>
                          </div>
                        </div>
                      );
                  })}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          <div className="my-3">
            {isAdmin(spaceData, session) && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Video</Button>
                </DialogTrigger>
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
            )}
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
