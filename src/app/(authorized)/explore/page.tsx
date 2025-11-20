import changelog from "@/data/changelog.json";
import Footer from "@/components/ui/Footer";
import ToDocumentation from "./ToDocumentation";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Explore() {
  return (
    <div className="min-h-screen flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <Heading />
      <ToDocumentation />
      <NewsAndUpdates />
      {changelog.map((entry, index) => (
        <DisplayChangelog
          key={index}
          version={entry.version}
          date={entry.date}
          title={entry.title}
          improv={entry.improvements}
          bugs={entry.fixes}
          message={entry.message}
        />
      ))}

      <Footer />
    </div>
  );
}

function Heading() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-xl font-bold ">Explore leetpulse</h1>
      <p className="text-text_muted">
        Stay updated with the latest features and improvements
      </p>
    </div>
  );
}

function NewsAndUpdates() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <h1 className="text-xl font-bold ">{"News & Updates"}</h1>
      <p className="text-text_muted text-sm">
        A changelog of the latest leetpulse feature releases, updates, and
        important bug fixes
      </p>
    </div>
  );
}

function DisplayChangelog({
  version,
  date,
  title,
  improv,
  bugs,
  message,
}: any) {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <div className="w-full md:3/5 lg:w-2/5 flex flex-col gap-3 px-4 rounded-md">
          <div className="flex flex-row gap-2 items-center text-sm text-text_muted font-bold">
            <CalendarDaysIcon className="w-6 h-6 text-success" /> {date} -{" "}
            {title}
          </div>
          <div className="bg-gradient-to-br from-[var(--bg-0)] to-[var(--bg-1)] hover:from-[var(--bg-1)] hover:to-[var(--bg-0)] flex flex-col border border-border p-4 rounded-3xl gap-2">
            {version.length > 0 && (
              <ChangeLogHeading heading1={"Version"} heading2={version} />
            )}
            {message.length > 0 && (
              <ChangeLogHeading heading1={"News"} heading2={""} />
            )}

            {message.length > 0 && (
              <ChangelogList title="Message:" value={message} />
            )}
            {improv.length > 0 && (
              <ChangelogList title="Improvements" value={improv} />
            )}
            {bugs.length > 0 && (
              <ChangelogList title="Bug Fixes" value={bugs} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ChangeLogHeading({
  heading1,
  heading2,
}: {
  heading1: string;
  heading2: string;
}) {
  return (
    <h2 className="flex flex-row gap-2 items-center justify-center font-bold text-xl border-b border-border p-2">
      <span className="text-xl font-bold">{heading1}</span>
      <span className="text-lg font-semibold">{heading2}</span>
    </h2>
  );
}

function ChangelogList({ title, value }: { title: string; value: any }) {
  return (
    <div>
      <h3 className="text-base font-semibold p-2">{title}</h3>
      <ul className="px-4 text-text_muted">
        {Array.isArray(value) ? (
          value.map((item, idx) => (
            <li key={idx} className="list-disc list-inside ">
              {item}
            </li>
          ))
        ) : (
          <li className="list-disc list-inside">{value}</li>
        )}
      </ul>
    </div>
  );
}

export const metadata = {
  title: "Explore | leetpulse",
  description: "Get latest updates about leetpulse",
};
