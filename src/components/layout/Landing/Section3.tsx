import KeyValueDisplay from "./KeyValueDisplay";

export default function Section3() {
  return (
    <section id="whyleetpulse" className="flex flex-col py-8 px-16 my-4 gap-8">
      {/* Heading */}
      <div className="text-2xl font-semibold tracking-wide">
        <span>{"</> "}Why?</span>
        <span className="text-accent">&nbsp;leetpulse</span>
      </div>
      {/* Content */}
      <KeyValueDisplay
        title="Tired of tracking problems in Notion, Excel, or random sticky notes?"
        value="We get it. Manual tracking is a pain. That’s why LeetPulse automates
          your review schedule — so you never have to “mark it green” yourself
          again."
      />
      <KeyValueDisplay
        title="Built on the Forgetting Curve"
        value="LeetPulse uses spaced repetition to hit you with reviews right before your brain dumps the problem. No more false confidence or memory gaps."
      />
      <KeyValueDisplay
        title="Consistency without burnout"
        value=" It’s not about grinding 100 problems a day. It’s about remembering the 10 you already solved. LeetPulse keeps you consistent without the overwhelm."
      />
    </section>
  );
}
