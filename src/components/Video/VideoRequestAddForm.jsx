"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const VideoRequestAddForm = ({ sid, refetchSpace }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const [step, setStep] = useState(0);
  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataDescription, setMetadataDescription] = useState("");
  const [metadataTags, setMetadataTags] = useState([]);
  const [tagsText, setTagsText] = useState("");
  const [selectedPrivacyStatus, setSelectedPrivacyStatus] = useState("public");

  const [vid, setVid] = useState(null);

  const [stepFormOpen, setStepFormOpen] = useState(false);

  return (
    <Dialog open={stepFormOpen} onOpenChange={setStepFormOpen}>
      <DialogTrigger asChild>
        <Button>Add Video</Button>
      </DialogTrigger>
      <DialogContent className="p-16">
        <Tabs defaultValue="videodata">
          <TabsList className="gap-x-6">
            <TabsTrigger value="videodata">Video Data</TabsTrigger>
            <TabsTrigger value="metadata" disabled={!vid}>
              Metadata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videodata">
            <Alert variant="destructive" className="my-8">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add metadata to the video after you add the video title
                and description for your space.
              </AlertDescription>
            </Alert>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const { data } = await axios.put(`/api/space/${sid}`, {
                  title: videoTitle,
                  description: videoDescription,
                });

                setVid(data._id);
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
          </TabsContent>

          <TabsContent value="metadata">
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await axios.post(`/api/video/${vid}/metadata`, {
                  title: metadataTitle,
                  description: metadataDescription,
                  tags: metadataTags,
                  privacyStatus: selectedPrivacyStatus,
                });

                toast("Video request added");
                refetchSpace();
                setStepFormOpen(false);
              }}
              className="gap-y-4 flex flex-col"
            >
              <Input
                type="text"
                placeholder="Title"
                value={metadataTitle}
                onChange={(e) => setMetadataTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Description"
                value={metadataDescription}
                onChange={(e) => setMetadataDescription(e.target.value)}
              />

              <div className="gap-x-3 flex items-center">
                <Input
                  type="text"
                  placeholder="Tags"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setMetadataTags((prev) => [...prev, tagsText]);
                    setTagsText("");
                  }}
                  type="button"
                >
                  <PlusCircleOutlined />
                </Button>
              </div>

              {metadataTags?.length ? (
                <div className="my-3 flex flex-wrap justify-around items-center">
                  {metadataTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-200 px-2 py-1 my-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <Select
                value={selectedPrivacyStatus}
                onValueChange={setSelectedPrivacyStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">public</SelectItem>
                  <SelectItem value="private">private</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit">Add Metadata To the Video</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VideoRequestAddForm;
