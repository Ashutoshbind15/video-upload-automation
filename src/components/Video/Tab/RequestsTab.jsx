"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ReviewChat from "../ReviewChat";
import AlertBlocker from "@/components/Layout/AlertBlocker";
import { CheckCircle } from "lucide-react";
import Uploader from "../Uploader";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const RequestsTab = ({
  spaceData,
  isAdmin,
  user,
  isEditor,
  refetchSpace,
  sid,
}) => {
  const { data: session, status } = useSession();

  return (
    <ul>
      {spaceData?.videos.map((video) => {
        const approved = video.requests.find((req) => req.approved === 2);

        const isUploader = video.requests.find(
          (req) => req.uploader._id === session.user.id
        );
        const hasPendingRequest = isUploader && isUploader.approved === 0;
        const hasApprovedRequest = isUploader && isUploader.approved === 1;

        if (!approved)
          return (
            <div
              key={video?._id}
              className="text-center border-y-2 border-slate-100 py-3"
            >
              <div className="my-4">
                <p className="text-2xl font-semibold">{video.title}</p>
                <p className="text-lg font-light">{video.description}</p>
              </div>

              {isAdmin(spaceData, session) && (
                <div className="mt-3 mb-6">
                  <h3 className="text-xl font-semibold mb-3">Requests</h3>
                  {video?.requests?.length ? (
                    <ul>
                      {video.requests.map((req) => {
                        if (video.uploaded) return null;
                        if (req.approved === 0 || req.approved === 1)
                          return (
                            <div
                              key={req._id}
                              className="flex items-center justify-between px-8 border-y-2 border-slate-100 py-3"
                            >
                              <div className="flex flex-col items-center">
                                <li>{req.uploader.username}</li>
                                <li>{req.uploader.email}</li>
                              </div>

                              <div className="flex items-center gap-x-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Preview</Button>
                                  </DialogTrigger>
                                  <DialogContent className="p-16">
                                    <DialogHeader>
                                      <DialogTitle>
                                        {req.uploader.username}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {req.uploader.email}
                                      </DialogDescription>
                                    </DialogHeader>

                                    {/* external link */}

                                    <a
                                      href={req.cloudUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-center underline"
                                    >
                                      Video Preview
                                    </a>

                                    {!req.approved ? (
                                      <Button
                                        onClick={async () => {
                                          await axios.post(
                                            `/api/video/${video._id}/chat`,
                                            {
                                              requestId: req._id,
                                              sender: session.user.id,
                                              text: "Hello, I would like to chat",
                                            }
                                          );

                                          refetchSpace();
                                        }}
                                      >
                                        Start Chat
                                      </Button>
                                    ) : (
                                      <ReviewChat
                                        comments={req?.chats}
                                        reqId={req._id}
                                        vid={video._id}
                                      />
                                    )}
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
                                      await axios.post(
                                        `/api/video/${video._id}/approve`,
                                        {
                                          requestId: req._id,
                                        }
                                      );
                                      refetchSpace();
                                    }}
                                    confirmToastText={"Video approved"}
                                    warningText={`Approve ${req.uploader.username}'s video request?`}
                                    warningTitle={"Approve Video"}
                                    btnText={"Approve"}
                                  >
                                    {user?.accounts?.length
                                      ? user?.accounts?.map((acc, idx) => (
                                          <div
                                            key={idx}
                                            className="my-2 py-2 border-y-2 border-gray-300 flex justify-between items-center"
                                          >
                                            <div>
                                              <p>{acc.provider}</p>
                                              <p>{acc.accountEmail}</p>
                                            </div>
                                            {user?.lastModifiedAccount
                                              ?.accountEmail ===
                                              acc.accountEmail && (
                                              <div className="flex items-center gap-x-2">
                                                <p>Selected</p>
                                                <CheckCircle className="text-green-500" />
                                              </div>
                                            )}
                                          </div>
                                        ))
                                      : null}
                                  </AlertBlocker>
                                )}
                              </div>
                            </div>
                          );
                      })}
                    </ul>
                  ) : (
                    <p>No requests found</p>
                  )}
                </div>
              )}

              {isEditor(spaceData, session) &&
                (!isUploader ? (
                  <Uploader vid={video._id} refetchSpace={refetchSpace} />
                ) : hasPendingRequest ? (
                  <div className="flex items-center justify-between">
                    <p className="text-center w-full">Waiting for response</p>
                  </div>
                ) : hasApprovedRequest ? (
                  <>
                    <Uploader vid={video._id} refetchSpace={refetchSpace} />
                    <ReviewChat
                      comments={isUploader?.chats}
                      reqId={isUploader?._id}
                      vid={video._id}
                    />
                  </>
                ) : (
                  <p>Uploaded</p>
                ))}
            </div>
          );
      })}
    </ul>
  );
};

export default RequestsTab;
