export default function Section6() {
  return (
    <section id="about" className="h-1/4 flex flex-col py-4 px-16 gap-4 my-8">
      <div className="text-2xl font-semibold tracking-wide">{"</> "}About</div>
      <div className="bg-bg1 flex flex-col gap-8 p-4 mx-4 rounded-md border-2 border-bg2">
        <div className="flex flex-col">
          <span className="text-text_primary font-semibold text-xl">
            About <span className="text-accent">leetpulse</span>
          </span>
          <span className="text-text_muted text-base">
            leetpulse helps coding enthusiasts retain solved problems
            efficiently using spaced repetition. Track your progress, review at
            the right intervals, and master algorithms without losing momentum.
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-text_primary font-semibold text-xl">
            Mission / Vision
          </span>
          <span className="text-text_muted text-base">
            The goal is to make coding practice smarter, not harder. Focus on
            learning, let leetpulse handle the reminders.
          </span>
        </div>
      </div>
    </section>
  );
}
