type Props = {
  title: string;
  value: any;
  className?: string;
};

export default function ValueKeyDisplay(props: Props) {
  const { title, value, className = "text-2xl " } = props;
  return (
    <div className="flex flex-col items-center p-2 rounded-md">
      <div className={`${className} font-bold text-text_primary`}>{value}</div>
      <div className="text-sm text-text_muted">{title}</div>
    </div>
  );
}