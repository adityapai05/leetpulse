import VideoThumbnail from "@/components/ui/YTVideoThumbnail";

export default function Section4() {
  return (
    <section id="howitworks" className="flex flex-col py-4 px-6 md:px-16 gap-6">
      <div className="text-xl md:text-2xl font-semibold tracking-wide">
        {"</> "}How it works
      </div>

      <div className="flex flex-col sm:flex-col md:flex-row gap-6 md:gap-8">
        {/* Video */}
        <div className="flex flex-1 items-center justify-center p-2 md:p-4">
          <VideoThumbnail />
        </div>

        {/* Description */}
        <div className="flex flex-1 p-2 md:p-4 items-start min-w-0">
          <div className="bg-bg1 flex flex-col gap-4 md:gap-6 p-4 rounded-xl border-2 border-border w-full">
            <span className="text-lg md:text-xl font-bold">
              Take a Tour of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]">
                leetpulse
              </span>
            </span>
            <span className="text-text_primary text-justify text-sm md:text-base">
              See how leetpulse helps you track, review, and master coding
              problems with ease. This walkthrough shows the core features,
              including problem tracking, spaced repetition reviews, performance
              stats, and more. Learn how to get the most out of your coding
              practice in just a few minutes.
            </span>
            <span className="text-text_muted text-xs md:text-sm">
              - Enjoy the app — just try not to break it! Please report any bugs
              you find.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
