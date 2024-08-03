"use client";

import ApprovedTab from "@/components/Video/Tab/ApprovedTab";
import RequestsTab from "@/components/Video/Tab/RequestsTab";
import UploadedTab from "@/components/Video/Tab/UploadedTab";
import VideoRequestAddForm from "@/components/Video/VideoRequestAddForm";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpace } from "@/lib/hooks/queries";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const isAdmin = (space, session) => {
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
                  <TabsTrigger value="approved" className="flex-1">
                    Approved
                  </TabsTrigger>
                )}
                <TabsTrigger value="uploaded" className="flex-1">
                  Uploaded
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requested" className="px-4 py-6">
                <RequestsTab
                  spaceData={spaceData}
                  isAdmin={isAdmin}
                  isEditor={isEditor}
                  refetchSpace={refetchSpace}
                  user={user}
                  sid={sid}
                />
              </TabsContent>

              {isAdmin(spaceData, session) && (
                <TabsContent value="approved">
                  <ApprovedTab spaceData={spaceData} />
                </TabsContent>
              )}

              <TabsContent value="uploaded">
                <UploadedTab spaceData={spaceData} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="my-3">
            {isAdmin(spaceData, session) && (
              <VideoRequestAddForm sid={sid} refetchSpace={refetchSpace} />
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
