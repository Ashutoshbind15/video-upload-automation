"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/utils";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const CreateSpacePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chosenEditors, setChosenEditors] = useState([]);
  const [editors, setEditors] = useState([]);
  const [editorSearch, setEditorSearch] = useState("");
  const rtr = useRouter();
  const debouncedEditorSearchValue = useDebounce(editorSearch, 1000);

  useEffect(() => {
    fetch(`/api/users?q=${debouncedEditorSearchValue}`)
      .then((res) => res.json())
      .then((data) => setEditors(data))
      .catch((error) => console.error(error));
  }, [debouncedEditorSearchValue]);

  return (
    <div className="h-screen flex flex-col gap-y-10 items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post("/api/space", {
              title,
              description,
              selectedUsers: chosenEditors.map((editor) => editor._id),
            });

            setTitle("");
            setDescription("");
            setChosenEditors([]);

            toast(`Space created successfully`);

            rtr.push("/space");
          } catch (error) {
            console.error(error);
          }
        }}
        className="flex flex-col gap-y-6 items-center w-full"
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/2"
        />

        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-1/2"
        />

        <Dialog>
          <DialogTrigger>Add Editors</DialogTrigger>
          <DialogContent className="py-12 max-h-screen overflow-y-auto">
            <Input
              type="text"
              placeholder="Search for editors"
              className="w-full"
              value={editorSearch}
              onChange={(e) => setEditorSearch(e.target.value)}
            />

            <div className="flex flex-col gap-x-4 items-center max-h-40 overflow-y-auto">
              {editors.map((editor) => {
                return (
                  <div
                    key={editor._id}
                    className="w-full flex items-center justify-between px-6 my-3"
                  >
                    <div>
                      <p>{editor.username}</p>
                      <p>{editor.email}</p>
                    </div>
                    <Button
                      onClick={() =>
                        setChosenEditors((prev) => [...prev, editor])
                      }
                      disabled={chosenEditors.some((e) => e._id === editor._id)}
                    >
                      <PlusIcon className="text-white" />
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center w-full gap-x-6 px-6 flex-wrap">
              {chosenEditors.map((editor) => (
                <div key={editor._id} className="mb-3 relative">
                  <div className="relative">
                    <span className="flex items-center justify-center rounded-full bg-black text-white p-2 h-10 w-10">
                      {editor.username.length > 0 ? editor.username[0] : ""}
                    </span>
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none p-0 border-0 cursor-pointer hover:bg-red-700"
                      onClick={() =>
                        setChosenEditors((prev) =>
                          prev.filter((e) => e._id !== editor._id)
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-x-6 px-6 flex-wrap w-1/2">
          {chosenEditors.map((editor) => (
            <div key={editor._id} className="mb-3 relative">
              <div className="relative">
                <span className="flex items-center justify-center rounded-full bg-black text-white p-2 h-10 w-10">
                  {editor.username.length > 0 ? editor.username[0] : ""}
                </span>
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none p-0 border-0 cursor-pointer hover:bg-red-700"
                  onClick={() =>
                    setChosenEditors((prev) =>
                      prev.filter((e) => e._id !== editor._id)
                    )
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="my-2 w-1/2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateSpacePage;
