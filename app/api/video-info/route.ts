import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 },
      );
    }

    const info = await ytdl.getInfo(url);
    const videoWithVideoFormats = info.formats.filter(
      (format) => format.hasVideo,
    );

    // Extract video qualities
    const videoFormats = extractVideoFormats(videoWithVideoFormats);

    return NextResponse.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      qualities: videoFormats,
    });
  } catch (error) {
    console.error("Video info error:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve video information",
      },
      { status: 500 },
    );
  }
}

function extractVideoFormats(videoWithVideoFormats: ytdl.videoFormat[]) {
  const videoFormats = videoWithVideoFormats
    .map((format) => format.qualityLabel)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => {
      const parseQuality = (q: string) => parseInt(q);
      return parseQuality(b) - parseQuality(a);
    });
  console.log("Video qualities:", videoFormats);
  return videoFormats;
}
