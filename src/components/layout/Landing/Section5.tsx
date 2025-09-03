import PricingCard from "./PricingCard";

export default function Section5() {
  return (
    <section id="pricing" className="h-1/4 flex flex-col py-4 px-16 gap-4">
      <div className="text-2xl font-semibold tracking-wide">
        {"</> "}Pricing
      </div>
      <div className="flex flex-row gap-4 p-4">
        <PricingCard
          price="Sounds like free"
          title="Features"
          features={[
            "Add and review problems",
            "Spaced repetition reminders",
            "Solve in built-in IDE",
            "No ads or trackers",
          ]}
        />
      </div>
    </section>
  );
}
