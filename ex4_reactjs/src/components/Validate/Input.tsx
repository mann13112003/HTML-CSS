import { memo } from "react";
import type { Input } from "../../types/validate.type";

const InputComponent = ({
  label,
  placeholder,
  type,
  required,
  onChange,
  value,
  error,
  errorText,
}: Input) => {
  return (
    <>
      <label
        htmlFor={label}
        className="text-base font-roboto leading-4 max-lg:text-sm font-normal"
      >
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`h-12 text-base border rounded-xl ${
          error ? "border-red-600" : "border-border"
        }  p-4 font-roboto tracking-[1%] outline-0 max-lg:text-sm`}
      />
      {error && (
        <div id="errEmail" className="text-red-600 text-sm">
          {errorText}
        </div>
      )}
    </>
  );
};

export default memo(InputComponent);
