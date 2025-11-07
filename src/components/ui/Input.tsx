import clsx from "clsx";

export default function Input({
  label = "enter",
  name = "enter",
  type = "text",
  multiline = false,
  width = "full",
  value,
  onChange,
  placeholder = "",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={name} className="text-text_primary font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          `bg-transparent font-normal text-base rounded-md border border-text_muted p-2 w-${width} focus:outline-none cursor-pointer placeholder:text-text_muted placeholder:text-sm`,
          className
        )}
      />
    </div>
  );
}
