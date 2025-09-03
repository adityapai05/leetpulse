import Image from "next/image";
import Button from "../layout/Landing/Button";

export default function VideoThumbnail() {
  return (
    <div className="bg-bg1 max-w-lg mx-auto border-2 border-bg2 rounded-xl p-2 shadow-lg">
      <Image
        src="https://img.youtube.com/vi/8UutYbQ2HH4/maxresdefault.jpg"
        alt="YouTube video thumbnail"
        width={640}
        height={360}
        className="rounded-lg"
      />
      <div className="flex flex-row justify-between px-4 py-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-text_primary">
            leetpulse - Tutorial video
          </span>
          <span className="text-sm text-text_muted">
            leetpulse - A Leetcode Tracker
          </span>
          <span className="text-sm text-text_muted">Redirect to YouTube</span>
        </div>
        <Button
          size="big"
          variant="secondary"
          text="Watch Now"
          href="https://www.youtube.com/watch?v=8UutYbQ2HH4"
        />
      </div>
    </div>
  );
}
