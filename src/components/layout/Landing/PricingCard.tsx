interface CardProps {
  price: string;
  title: string;
  features: string[];
}

export default function PricingCard({ price, title, features }: CardProps) {
  const featureItems = features.map((feature, i) => <li key={i}>{feature}</li>);

  return (
    <div className="bg-bg1 flex flex-col gap-4 md:gap-6 border-2 border-bg2 px-4 md:px-6 py-4 rounded-xl w-full max-w-sm md:max-w-xs mx-auto flex-shrink-0 min-w-0">
      <span className="text-2xl md:text-3xl font-bold text-center md:text-left break-words">
        {price}
      </span>
      <span className="text-lg md:text-xl font-semibold text-center md:text-left break-words">
        {title}
      </span>
      <ul className="flex flex-col text-sm gap-2 md:gap-3 list-disc list-inside break-words">
        {featureItems}
      </ul>
    </div>
  );
}
