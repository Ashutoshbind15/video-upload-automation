"use client";

import { useState } from "react";

function FileUploader() {
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const upload = async () => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      // Handle response
    };

    upload();
  };

  // Implement polling here to update `progress`

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <progress value={progress} max="100"></progress>
    </div>
  );
}

export default FileUploader;
