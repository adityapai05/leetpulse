import clsx from "clsx";
import { Loader } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "inverted" | "error";
  size?: "small" | "big" | "tertiary";
  text?: string;
  loading?: boolean;
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "small",
    text = "Button",
    loading = false,
    ...rest
  } = props;

  const baseStyles =
    "transition-all duration-300 ease-in-out shadow-md flex items-center justify-center gap-2";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-text_contrast font-semibold transition-duration-500 ease-out bg-[length:200%_200%] bg-[position:left_center] hover:bg-[position:right_center] hover:shadow-lg",
    secondary:
      "bg-text_primary text-bg0 font-normal ring-text_primary hover:bg-text_muted hover:text-text_contrast",
    tertiary:
      "bg-bg2 text-text_muted ring-bg2 hover:bg-bg1 shadow-[0px_2px_2px_2px_var(--bg-0)]",
    inverted:
      "bg-text_primary text-text_contrast hover:ring-1 font-semibold ring-text_primary hover:bg-transparent hover:text-text_primary",
    error:
      "bg-error text-text_contrast font-semibold ring-error hover:bg-transparent hover:text-error",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm rounded-md",
    big: "px-5 py-2 text-base rounded-md",
    tertiary: "px-4 py-2 text-sm rounded-md",
  };

  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant])}
    >
      {loading && <Loader className="h-4 w-4 animate-spin" />}
      {text}
    </button>
  );
}
