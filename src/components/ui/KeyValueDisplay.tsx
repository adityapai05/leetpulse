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
    className = "text-sm";
  }
  return (
    <div className="flex flex-col gap-1 items-baseline bg-bg2 py-2 px-4 rounded-md">
      <div className={`text-sm text-warning `}>{title}</div>
      <div className={className}>{value}</div>
    </div>
  );
}
