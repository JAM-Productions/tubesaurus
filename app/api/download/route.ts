import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import { spawn } from "child_process";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 },
      );
    }
    await removePreviousMerged();
    await downloadAndMerge(url);
    await removeGeneratedFiles();
    return new Response("Download and merge complete");
  } catch (error) {
    console.error("Download error:", error);
    await removeGeneratedFiles();
    return NextResponse.json(
      {
        error: "Failed to process download",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

async function removePreviousMerged() {
  try {
    await fs.unlink("merged.mp4");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Error removing previous merged file:", err);
      throw err;
    }
  }
}

async function removeGeneratedFiles() {
  try {
    const files = await fs.readdir(".");
    const baseFiles = files.filter((file) => file.endsWith("-base.js"));
    const videoFiles = files.filter(
      (file) => file === "video.mp4" || file === "audio.mp4",
    );
    await Promise.all(
      baseFiles
        .map((file) =>
          fs
            .unlink(file)
            .catch((err) =>
              console.error(`Failed to delete file: ${file}`, err),
            ),
        )
        .concat(
          videoFiles.map((file) =>
            fs
              .unlink(file)
              .catch((err) =>
                console.error(`Failed to delete file: ${file}`, err),
              ),
          ),
        ),
    );
  } catch (err) {
    console.error("Error removing generated files:", err);
  }
}

async function downloadAndMerge(url: string) {
  try {
    console.log("Starting download...");
    await Promise.all([
      downloadFile(url, "highestvideo", "video.mp4"),
      downloadFile(url, "highestaudio", "audio.mp4"),
    ]);
    console.log("Download complete, starting merge...");
    await mergeFiles("video.mp4", "audio.mp4", "merged.mp4");
    console.log("Merge complete");
  } catch (err) {
    console.error("Error downloading and merging:", err);
    throw err;
  }
}

function downloadFile(
  url: string,
  quality: string,
  output: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality });
    const fileStream = createWriteStream(output);

    stream.pipe(fileStream);

    stream.on("end", () => {
      console.log(`${output} download complete`);
      resolve();
    });

    stream.on("error", (err) => {
      console.error(`Error downloading ${output}:`, err);
      reject(new Error(`Failed to download ${output}: ${err.message}`));
    });

    fileStream.on("error", (err) => {
      console.error(`Error writing to file ${output}:`, err);
      reject(new Error(`Failed to write to file ${output}: ${err.message}`));
    });
  });
}

function mergeFiles(
  videoPath: string,
  audioPath: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      videoPath,
      "-i",
      audioPath,
      "-c",
      "copy",
      outputPath,
    ]);

    const timeout = setTimeout(() => {
      ffmpeg.kill();
      reject(new Error("ffmpeg process timed out"));
    }, 5000);

    ffmpeg.on("close", (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        console.log(`File merged successfully to ${outputPath}`);
        resolve();
      } else {
        reject(new Error(`ffmpeg process exited with code ${code}`));
      }
    });

    ffmpeg.on("error", (err) => {
      clearTimeout(timeout);
      console.error("Error during ffmpeg execution:", err);
      reject(new Error(`ffmpeg execution error: ${err.message}`));
    });
  });
}
