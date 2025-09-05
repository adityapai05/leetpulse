type Props = {
  title: string;
  value: string;
  className?: string;
};

export default function KeyValueDisplay(props: Props) {
  let { title, value, className } = props;
  if (!className) {
    className = "text";
  }
  return (
    <div className="border-2 border-bg2 p-2 flex flex-row gap-4 rounded-xl my-2">
      <div className="bg-bg2 flex flex-col items-baseline py-2 px-4 rounded-lg border-2 border-bg2 shadow-md">
        <div className="text-accent text-sm">{title}</div>
        <div className={className}>{value}</div>
      </div>
    </div>
  );
}
