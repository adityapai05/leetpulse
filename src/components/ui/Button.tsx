import clsx from "clsx";

export default function Button({
  variant = "primary",
  text = "Button",
  onClickFunction,
  type,
}) {
  const baseStyles = "px-8 py-2";

  const variantStyles = {
    primary:
      "bg-accent text-text_contrast text-base font-semibold ring-1 ring-inset ring-accent rounded-md hover:bg-transparent hover:text-accent transition-colors duration-200 shadow-md",
    secondary:
      "bg-transperent text-text_muted text-base font-normal ring-1 ring-inset ring-text_muted rounded-md hover:bg-text_muted hover:text-text_contrast transition-colors duration-200 shadow-[0px_2px_2px_0px_var(--bg-0)] hover:shadow-[0px_2px_2px_0px_var(--bg-0)]",
    tertiary:
      "bg-bg2 ring-1 ring-inset ring-bg2 rounded-md text-text_muted hover:bg-bg1 shadow-[0px_2px_2px_2px_var(--bg-0)]",
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <button
          type={type}
          onClick={onClickFunction}
          className={clsx(baseStyles, variantStyles[variant])}
        >
          {text}
        </button>
      </div>
    </>
  );
}
