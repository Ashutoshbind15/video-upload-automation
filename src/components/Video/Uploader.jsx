"use client";

import { UploadButton } from "@uploadthing/react";
import { toast } from "sonner";

const Uploader = ({ endpoint = "videoUploader", vid, refetchSpace }) => {
  return (
    <>
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response

          toast("Upload complete!");
          refetchSpace();
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        input={{ vid }}
        className="ut-btn"
      />
    </>
  );
};

export default Uploader;
