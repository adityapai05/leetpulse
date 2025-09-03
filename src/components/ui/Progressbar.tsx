import clsx from "clsx";

export default function ProgressBar({ value = 50, max = 100 }) {
  const percentage = max && max > 0 ? Math.min(100, (value / max) * 100) : 0;

  const baseStyles = "h-2 transition-all duration-300";

  const color =
    percentage < 40 ? "error" : percentage < 70 ? "warning" : "success";

  console.log(percentage);

  return (
    <div
      className={clsx("w-full rounded-full h-2 overflow-hidden border", {
        "border-error": color === "error",
        "border-warning": color === "warning",
        "border-success": color === "success",
      })}
    >
      <div
        className={clsx(baseStyles, {
          "bg-error": color === "error",
          "bg-warning": color === "warning",
          "bg-success": color === "success",
        })}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
