import clsx from "clsx";
import Link from "next/link";

export default function Button({
  variant = "primary",
  size = "small", // small | big | tertiary
  text = "Button",
  href,
  target = "",
}) {
  const baseStyles = "transition-all duration-300 ease-in-out shadow-md";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-text_contrast font-semibold transition-duration-500 ease-out bg-[length:200%_200%] bg-[position:left_center] hover:bg-[position:right_center] hover:shadow-lg",
    secondary:
      "bg-text_primary text-bg0 font-normal ring-text_primary hover:bg-text_muted hover:text-text_contrast",
    tertiary:
      "bg-bg2 text-text_muted ring-bg2 hover:bg-bg1 shadow-[0px_2px_2px_2px_var(--bg-0)]",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm rounded-md",
    big: "px-5 py-2 text-base rounded-md",
    tertiary: "px-4 py-2 text-sm rounded-md",
  };

  return (
    <Link href={`${href || ""}`} target={target}>
      <button
        className={clsx(
          baseStyles,
          sizeStyles[size], // now size is separate
          variantStyles[variant]
        )}
      >
        {text}
      </button>
    </Link>
  );
}
