"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";

const ReviewChat = ({ comments, reqId, vid }) => {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState(comments);

  console.log(commentsData);
  const cuser = session?.user?.id;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>View Chat</Button>
      </DrawerTrigger>
      <DrawerContent
        className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none"
        showBar={false}
      >
        <ScrollArea className="h-screen">
          <div className="h-screen flex flex-col">
            <DrawerHeader>
              <DrawerTitle>Chat</DrawerTitle>
              <DrawerDescription>
                Iteration notes on the video.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto p-2 flex flex-col">
              {commentsData?.map((comment, idx) => (
                <div
                  key={idx}
                  className={`w-1/2 mb-2 rounded-md py-1 px-3 ${
                    comment?.sender === cuser
                      ? "self-start bg-slate-900 text-white"
                      : "self-end bg-slate-300 text-black"
                  }`}
                >
                  {comment?.text}
                </div>
              ))}
            </div>
            <DrawerFooter>
              <div className="flex gap-x-4">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={async () => {
                    console.log(comment);

                    const { data } = await axios.post(
                      `/api/video/${vid}/chat`,
                      {
                        requestId: reqId,
                        sender: cuser,
                        text: comment,
                      }
                    );

                    setCommentsData((prev) => {
                      return [...prev, data];
                    });
                  }}
                >
                  Add
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ReviewChat;
