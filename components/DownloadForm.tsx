"use client";

import React from "react";

function DownloadForm() {
  return (
    <form
      className="w-full max-w-2xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Implement download logic
      }}
    >
      <input
        className="w-full inline-flex items-center justify-center rounded-md font-medium py-1.5 px-4"
        placeholder={"Paste YouTube URL here..."}
      />
      <button
        className="w-full inline-flex items-center justify-center rounded-md font-medium bg-black text-white py-1.5"
        type="submit"
      >
        Download
      </button>
    </form>
  );
}

export default DownloadForm;
