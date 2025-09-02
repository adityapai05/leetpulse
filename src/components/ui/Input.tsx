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
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            `bg-bg2 font-normal text-base rounded-md border border-text_primary p-2 w-${width} shadow-[0_1px_0px_var(--text-primary)] focus:border-accent focus:outline-none focus:shadow-[0_2px_0px_var(--accent)] cursor-text resize-y`,
            className
          )}
          rows={6} // default rows for textarea
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            `bg-bg1 font-normal text-base rounded-md border border-text_primary p-2 w-${width} shadow-[0_1px_0px_var(--text-primary)] focus:border-accent focus:outline-none focus:shadow-[0_2px_0px_var(--accent)] cursor-pointer placeholder:text-text_muted`,
            className
          )}
        />
      )}
    </div>
  );
}
