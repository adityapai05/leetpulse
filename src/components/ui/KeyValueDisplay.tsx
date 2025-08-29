type Props = {
  title: string;
  value: string;
  valueColor?: string;
  className?: string;
};

export default function KeyValueDisplay(props: Props) {
  let { title, value, valueColor, className } = props;
  if (!valueColor) {
    valueColor = "text-text_primary";
  }
  if (!className) {
    className = "text-base";
  }
  return (
    <div className="flex flex-row gap-2 items-baseline bg-bg2 p-2 rounded-md">
      <div className={`text-sm text-accent `}>{title}</div>
      <div className={className}>{value}</div>
    </div>
  );
}
