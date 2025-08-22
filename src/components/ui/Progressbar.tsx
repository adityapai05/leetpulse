import clsx from "clsx";

export default function ProgressBar({ value = 50, max = 100 }) {
  const percentage = Math.min((value / max) * 100, 100);

  const baseStyles = "h-2 transition-all duration-300";

  const color =
    percentage < 40 ? "error" : percentage < 70 ? "warning" : "success";

  return (
    <div
      className={clsx(
        "w-full bg-bg2 rounded-full h-2 overflow-hidden border",
        `border-${color}`
      )}
    >
      <div
        className={clsx(baseStyles, `bg-${color}`)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
