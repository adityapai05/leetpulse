type Props = {
  title: string;
  value: string;
  valueColor?: string;
  className?: string;
};

export default function KeyValueDisplay(props: Props) {
  const {
    title,
    value,
    valueColor = "text-text_primary",
    className = "text-sm",
  } = props;
  void valueColor;
  void className;
  return (
    <div className="flex flex-col">
      <div className="text-text_primary text-lg font-medium">{title}</div>
      <div className="text-text_muted">{value}</div>
    </div>
  );
}
