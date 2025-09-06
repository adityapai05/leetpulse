export default function Section6() {
  return (
    <section
      id="about"
      className="flex flex-col py-4 px-6 md:px-16 gap-6 md:gap-8 my-8"
    >
      <div className="text-xl md:text-2xl font-semibold tracking-wide">
        {"</> "}About
      </div>

      <div className="bg-bg1 flex flex-col gap-4 md:gap-8 p-4 rounded-md border-2 border-bg2 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-text_primary font-semibold text-lg md:text-xl">
            About <span className="text-accent">leetpulse</span>
          </span>
          <span className="text-text_muted text-sm md:text-base">
            leetpulse helps coding enthusiasts retain solved problems
            efficiently using spaced repetition. Track your progress, review at
            the right intervals, and master algorithms without losing momentum.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-text_primary font-semibold text-lg md:text-xl">
            Mission / Vision
          </span>
          <span className="text-text_muted text-sm md:text-base">
            The goal is to make coding practice smarter, not harder. Focus on
            learning, let leetpulse handle the reminders.
          </span>
        </div>
      </div>
    </section>
  );
}
