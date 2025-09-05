import changelog from "@/data/changelog.json";
import Image from "next/image";
import leetpulseLandingPagePhoto from "@/assets/leetpulseLandingPagePhoto.png";
import Footer from "@/components/ui/Footer";

export default function Explore() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-8 mx-6 md:mx-16 my-8">
        {/* Updates Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-text_primary">Updates</h1>
          {changelog.map((entry, i) => (
            <div
              key={i}
              className="p-4 flex flex-col bg-bg1 gap-2 rounded-lg border border-bg2 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-text_primary">
                {entry.version} – {entry.title}
              </h2>
              <div className="text-text_primary">{entry.message}</div>
              <div className="text-xs text-text_muted">{entry.date}</div>
            </div>
          ))}
        </div>

        {/* Sidebar Image */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="w-full max-w-sm">
            <Image
              src={leetpulseLandingPagePhoto}
              alt="Landing Page Preview"
              className="rounded-xl shadow-lg border border-bg2"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
