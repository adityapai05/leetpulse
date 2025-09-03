import VideoThumbnail from "@/components/ui/YTVideoThumbnail";

export default function Section4() {
  return (
    <section id="howitworks" className="h-1/4 flex flex-col py-4 px-16 gap-4">
      <div className="text-2xl font-semibold tracking-wide">
        {"</> "}How it works
      </div>
      <div className="flex flex-row gap-8 p-4 items-start">
        <div className="flex flex-1 items-center justify-center p-4">
          <VideoThumbnail />
        </div>
        <div className="flex flex-1 p-4 items-center ">
          <div className="bg-bg1 flex flex-col gap-8 p-4 rounded-xl border-2 border-bg2">
            <span className="text-xl font-bold">
              Take a Tour of <span className="text-accent">leetpulse</span>
            </span>
            <span className="text-text_primary text-justify">
              See how leetpulse helps you track, review, and master coding
              problems with ease. This walkthrough shows the core features,
              including problem tracking, spaced repetition reviews, performance
              stats, and more. Learn how to get the most out of your coding
              practice in just a few minutes.
            </span>
            <span className="text-text_muted text-sm">
              - Enjoy the app — just try not to break it! Jokes aside, please
              report any bugs you find.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
