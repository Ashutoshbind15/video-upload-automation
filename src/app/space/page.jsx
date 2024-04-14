"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSpaces } from "@/lib/hooks/queries";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SpacePage = () => {
  const { spacesError, spacesData, isSpacesError, isSpacesLoading } =
    useSpaces();

  const rtr = useRouter();

  if (isSpacesLoading) {
    return <div>Loading...</div>;
  }

  if (isSpacesError) {
    return <div>Error: {spacesError.message}</div>;
  }

  return (
    <>
      <div className="p-8 gap-y-8">
        {spacesData.map((space) => (
          <Card
            key={space._id}
            onClick={() => rtr.push(`/space/${space._id}`)}
            className="hover:shadow-lg hover:cursor-pointer my-6"
          >
            <CardHeader>
              <CardTitle>{space.title}</CardTitle>
              <CardDescription>{space.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="mb-2 font-bold text-lg">Videos</h3>
              <div className="flex flex-wrap items-center gap-y-4">
                {space.videos.map((video) => (
                  <div key={video._id} className="w-1/3 px-2">
                    <Card className="w-full rounded-lg">
                      <CardHeader>
                        <CardTitle>{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex items-center justify-between gap-x-4 w-full">
                <div className="flex -space-x-4">
                  {space?.editors?.map((editor, index) => {
                    console.log(editor);

                    return (
                      <div
                        key={editor._id}
                        className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center "
                        style={{ zIndex: space?.editors?.length - index }}
                      >
                        {editor?.username?.length && editor?.username[0]}
                      </div>
                    );
                  })}
                </div>
                <div className="flex -space-x-4">
                  {space?.admins?.map((admin, index) => {
                    console.log(admin);

                    return (
                      <div
                        key={admin._id}
                        className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center "
                        style={{ zIndex: space?.admins?.length - index }}
                      >
                        {admin?.username?.length && admin?.username[0]}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Button className="ml-8 mb-4">
        <Link href="/space/create"> Create Space </Link>
      </Button>
    </>
  );
};

export default SpacePage;
