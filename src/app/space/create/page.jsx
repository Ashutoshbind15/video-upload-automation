"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateSpacePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [chosenEditors, setChosenEditors] = useState([]);
  const [editors, setEditors] = useState([]);
  const [editorSearch, setEditorSearch] = useState("");

  const rtr = useRouter();

  console.log(editors);

  useEffect(() => {
    const fetchEditors = async () => {
      const { data } = await axios.get("/api/users");
      setEditors(data);
    };

    fetchEditors();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-y-10 items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            console.log(chosenEditors);
            console.log(title, description);

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
          <DialogContent className="py-12">
            <Input
              type="text"
              placeholder="Search for editors"
              className="w-full"
              value={editorSearch}
              onChange={(e) => setEditorSearch(e.target.value)}
            />

            {chosenEditors.map((editor) => (
              <div key={editor._id}>
                <p>{editor.username}</p>
                <Button
                  onClick={() =>
                    setChosenEditors((prev) =>
                      prev.filter((e) => e._id !== editor._id)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className="flex flex-col gap-y-2">
              {editors.map((editor) => {
                if (
                  editor.username.toLowerCase().includes(editorSearch) ||
                  editor.email.toLowerCase().includes(editorSearch)
                ) {
                  return (
                    <div key={editor._id}>
                      <p>{editor.username}</p>
                      <Button
                        onClick={() =>
                          setChosenEditors((prev) => [...prev, editor])
                        }
                      >
                        Add
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          </DialogContent>
        </Dialog>

        <Button type="submit" className="my-2 w-1/2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateSpacePage;
