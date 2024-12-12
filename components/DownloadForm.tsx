"use client";

import React from "react";

function DownloadForm() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleDownload = async () => {
    if (!isValidYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type: "video", quality: "highest" }),
      });

      if (!response.ok) {
        throw new Error("Failed to download");
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-2xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleDownload();
      }}
    >
      <input
        className="w-full inline-flex items-center justify-center rounded-md font-medium py-1.5 px-4"
        placeholder={"Paste YouTube URL here..."}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="w-full inline-flex items-center justify-center rounded-md font-medium bg-black text-white py-1.5"
        type="submit"
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default DownloadForm;
