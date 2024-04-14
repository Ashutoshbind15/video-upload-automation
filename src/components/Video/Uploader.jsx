"use client";

import { UploadButton } from "@uploadthing/react";

const Uploader = ({ endpoint = "videoUploader", vid }) => {
  return (
    <>
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
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
