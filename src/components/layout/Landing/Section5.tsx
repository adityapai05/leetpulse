import PricingCard from "./PricingCard";

export default function Section5() {
  return (
    <section
      id="pricing"
      className="flex flex-col py-4 px-6 md:px-16 gap-6 md:gap-8"
    >
      <div className="text-xl md:text-2xl font-semibold tracking-wide">
        {"</> "}Pricing
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row gap-4 p-0 md:p-4">
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
        {/* Add more PricingCard components here if needed */}
      </div>
    </section>
  );
}
