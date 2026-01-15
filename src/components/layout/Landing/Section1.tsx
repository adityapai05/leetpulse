import Button from "./Button";

export default function Section1() {
  return (
    <section className="flex flex-col md:flex-row py-4 px-6 md:px-16 my-4 gap-8">
      {/* Left Content */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-accent">leetpulse&nbsp;</span>
            <span>- A Spaced Repetition Tracker</span>
          </div>
          <div className="text-text_muted text-sm md:text-base">
            Track & retain your LeetCode practice.
          </div>
        </div>
        <div className="text-text_primary text-justify text-sm md:text-base">
          leetpulse uses spaced repetition and the forgetting curve to help you
          retain{" "}
          <a
            href="https://leetcode.com/"
            target="_blank"
            className="underline text-text_primary"
          >
            LeetCode
          </a>{" "}
          problems long-term. Track your progress, review problems right when
          you’re about to forget them, and stay consistent with a sleek,
          distraction-free interface.
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            text="Get Started Free"
            size="big"
            href="login"
          />
          <Button variant="tertiary" text="Read More" size="big" href="/docs" />
        </div>
      </div>

      {/* Right Content for Image (in future) */}
      <div className="flex flex-1"></div>
    </section>
  );
}
