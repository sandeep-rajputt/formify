import { UseFormRegisterReturn } from "react-hook-form";

interface HookCheckBoxInputProps {
  register: UseFormRegisterReturn;
  label: string | undefined;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  message: string;
}

function HookCheckBoxInput({
  register,
  label,
  error,
  onChange,
  required = false,
  message,
}: HookCheckBoxInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    register.onChange(e);
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="flex gap-1 items-center">
          <label className="text-[13px] font-medium wrap-anywhere">
            {label}
            {required && label && (
              <span className="text-red-500 text-sm">*</span>
            )}
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          name={register.name}
          ref={register.ref}
          onBlur={register.onBlur}
          onChange={handleChange}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-xs opacity-80 dark:text-dark-fg-muted">
          {message}
          {required && !label && (
            <span className="text-red-500 text-sm">*</span>
          )}
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default HookCheckBoxInput;
