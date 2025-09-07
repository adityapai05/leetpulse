import changelog from "@/data/changelog.json";
import Image from "next/image";
import leetpulseLandingPagePhoto from "@/assets/leetpulseLandingPagePhoto.png";
import Footer from "@/components/ui/Footer";

export default function Explore() {
  return (
    <>
      <div className="flex flex-col mx-6 md:mx-16 my-8 p-4 gap-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-2">
              <div className="text-text_primary text-2xl font-bold">
                Welcome to leetpulse
              </div>
              <div>
                Hey there! This is the MVP version of the app, so it might not
                be perfectly seamless yet &mdash; but I&apos;m constantly
                improving it for a better experience.
              </div>
            </div>

            {/* Updates Section */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-text_primary">
                What&apos;s New:
              </h1>
              {changelog.map((entry, i) => (
                <div
                  key={i}
                  className="p-4 flex flex-col bg-bg1 gap-2 rounded-lg border border-bg2 shadow-sm"
                >
                  <h2 className="text-lg font-semibold text-text_primary">
                    {entry.version} &ndash; {entry.title}
                  </h2>
                  <div className="text-text_primary">
                    {entry.message.map((line, j) => (
                      <div key={j}>{"- " + line}</div>
                    ))}
                  </div>
                  <div className="text-xs text-text_muted">{entry.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="w-full h-[320px] relative rounded-xl shadow-lg border border-bg2">
              <Image
                src={leetpulseLandingPagePhoto}
                alt="Landing Page Preview"
                fill
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const metadata = {
  title: "Explore | leetpulse",
  description: "Get latest updates about leetpulse",
};
