import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { TbInfoTriangle } from "react-icons/tb";
import { UseFormRegisterReturn } from "react-hook-form";

interface HookTextInputProps {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  message?: string;
  type?: "text" | "number";
}

function HookTextInput({
  register,
  label,
  error,
  defaultValue,
  onChange,
  required = false,
  placeholder = "",
  message,
  type = "text",
}: HookTextInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Call the register's onChange first
    register.onChange(e);
    // Then call the custom onChange if provided
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="flex gap-1 items-center">
          <label className="text-[13px] font-medium wrap-anywhere">
            {label}{" "}
            {required && <span className="text-red-500 text-sm">*</span>}
          </label>
          {defaultValue && (
            <Popover>
              {({ open }) => {
                return (
                  <>
                    <PopoverButton className="cursor-pointer">
                      <TbInfoTriangle className="text-xs" />
                    </PopoverButton>

                    {open && (
                      <PopoverPanel
                        anchor="bottom"
                        as="div"
                        className="absolute z-50 mt-1 w-max !max-w-96 rounded-xl border border-light-fg-muted/20 dark:border-dark-fg-muted/20 bg-light-bg dark:bg-dark-bg p-1 px-2 shadow-lg text-light-fg/80 dark:text-dark-fg/80"
                      >
                        <p className="wrap-anywhere">
                          If no value is provided,{" "}
                          <span className="inline-block px-2 dark:bg-dark-surface-alt rounded-md text-sm">
                            {defaultValue}
                          </span>{" "}
                          will be used as the default.
                        </p>
                      </PopoverPanel>
                    )}
                  </>
                );
              }}
            </Popover>
          )}
        </div>
        {message && (
          <p className="text-xs opacity-80 dark:text-dark-fg-muted">
            {message}
          </p>
        )}
      </div>
      <input
        name={register.name}
        ref={register.ref}
        onBlur={register.onBlur}
        placeholder={placeholder}
        onChange={handleChange}
        type={type}
        className="border rounded-md  border-light-fg-muted/20 dark:border-dark-fg-muted/20 focus:outline-none h-9 px-2 text-light-text/95 dark:text-dark-text/95 text-sm"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default HookTextInput;
