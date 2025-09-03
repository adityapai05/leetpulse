interface CardProps {
  price: string;
  title: string;
  features: string[];
}

export default function PricingCard({ price, title, features }: CardProps) {
  const featureItems = [];
  for (let i = 0; i < features.length; i++) {
    featureItems.push(<li key={i}>{features[i]}</li>);
  }

  return (
    <div className="bg-bg1 flex flex-col gap-8 border-2 border-bg2 px-8 py-4 rounded-xl w-1/4">
      <span className="text-3xl font-bold">{price}</span>
      <span className="text-xl   font-semibold">{title}</span>
      <ul className="flex flex-col text-sm gap-4 list-disc list-inside">
        {featureItems}
      </ul>
    </div>
  );
}
