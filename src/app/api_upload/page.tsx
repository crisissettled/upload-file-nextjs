"use client";

import { useState } from "react";

export default function Page() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && (files.length ?? 0) > 0) {
      setFile(files[0]);
    }
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", file as Blob);

    formData.append("fileNameOrigin", file?.name as string);

    fetch("/api/upload", {
      method: "post",
      body: formData,
    });
  };

  return (
    <div className="m-2">
      <p className="m-2">
        <input
          className="border"
          type="input"
          name="fileName"
          onChange={(e) => setFileName(e.target.value)}
        />
      </p>
      <p className="m-2">
        <input type="file" name="file" onChange={handleChange} />
      </p>
      <p className="m-2">
        <button
          onClick={handleUpload}
          type="submit"
          className="rounded  bg-purple-300 active:bg-purple-600 p-2"
        >
          Upload Image
        </button>
      </p>
    </div>
  );
}
