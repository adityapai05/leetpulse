import Image from "next/image";
import Button from "../layout/Landing/Button";
import YouTubeVideoThumbnail from "@/assets/leetpulseTutorialThumbnail.png";

export default function VideoThumbnail() {
  return (
    <div className="bg-bg1 max-w-lg mx-auto border-2 border-bg2 rounded-xl p-2 shadow-lg">
      <Image
        src={YouTubeVideoThumbnail}
        alt="YouTube video thumbnail"
        width={640}
        height={360}
        className="rounded-lg w-full h-auto"
      />
      <div className="flex flex-col gap-4 p-4">
        {/* Text */}
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-text_primary break-words">
            leetpulse - Tutorial video
          </span>
          <span className="text-sm text-text_muted break-words">
            leetpulse - A Leetcode Tracker
          </span>
          <span className="text-sm text-text_muted">Redirect to YouTube</span>
        </div>
        {/* Button */}
        <Button
          size="big"
          variant="secondary"
          text="Watch Now"
          href="https://youtu.be/nIEoRWVt4rg4"
          target="_blank"
        />
      </div>
    </div>
  );
}
