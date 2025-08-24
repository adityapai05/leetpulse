import clsx from "clsx";

export default function Phases({ variant = "unknown" }) {
  const baseStyles =
    "bg-transparent flex items-center justify-center rounded-full border text-xs px-4 py-1";
  const variantStyles = {
    stable: "text-success border-success",
    learning: "text-warning border-warning",
    struggling: "text-error border-error",
  };
  return (
    <div className={clsx(baseStyles, variantStyles[variant])}>{variant}</div>
  );
}
