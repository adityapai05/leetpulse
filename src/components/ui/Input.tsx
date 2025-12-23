import clsx from "clsx";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={name} className="text-text_primary font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            `bg-transparent font-normal text-base rounded-md border border-border px-2 py-2 w-${width}
             focus:outline-none cursor-pointer placeholder:text-text_muted placeholder:text-sm
             ${isPassword ? "pr-10" : ""}`,
            className
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text_muted"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
