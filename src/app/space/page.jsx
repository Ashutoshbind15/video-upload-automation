"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
            </CardHeader>
            <CardContent>
              <p>{space.description}</p>
            </CardContent>

            <CardFooter>{space._id}</CardFooter>
          </Card>
        ))}
      </div>

      <Button className="ml-8">
        <Link href="/space/create"> Create Space </Link>
      </Button>
    </>
  );
};

export default SpacePage;
