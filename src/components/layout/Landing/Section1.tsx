import Button from "./Button";

export default function Section1() {
  return (
    <section className="flex flex-row py-4 px-16 my-4">
      {/* Left Content */}
      <div className="flex flex-1 gap-10 flex-col">
        <div className="flex flex-col">
          <div
            className="text-3xl font-extrabold tracking-wide"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            <span className="text-accent">leetpulse&nbsp;</span>
            <span>- A Leetcode Tracker</span>
          </div>
          <div className="text-text_muted">
            Master coding problems. Never forget them again.
          </div>
        </div>
        <div className="text-text_primary text-justify">
          LeetPulse uses spaced repetition and the forgetting curve to help you
          retain LeetCode problems long-term. Track your progress, review
          problems right when you’re about to forget them, and stay consistent
          with a sleek, distraction-free interface.
        </div>
        <div className="flex flex-row gap-4">
          <Button
            variant="primary"
            text="Get Started Free"
            size="big"
            href="login"
          />
          <Button variant="tertiary" text="Read More" size="big" href="/" />
        </div>
      </div>
      {/* Right Content for Image (in future) */}
      <div className="flex flex-1"></div>
    </section>
  );
}
