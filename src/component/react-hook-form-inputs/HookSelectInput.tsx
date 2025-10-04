import { Controller, Control, FieldValues, Path } from "react-hook-form";
import NewListbox from "@/component/headlessui/NewListbox";
import ListBoxBtn from "@/component/headlessui/ListboxBtn";
import ListboxOpts from "@/component/headlessui/ListboxOpts";
import ListboxOptn from "@/component/headlessui/ListboxOptn";
import EllipsisText from "../common/EllipsisText";

type SelectOption = {
  id: number;
  name: string;
  value: string | boolean;
};

// Use the same type as NewListbox expects
type FilterOptions = {
  id: number;
  name: string;
};

interface HookSelectInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  onChange?: (value: SelectOption) => void;
  required?: boolean;
  placeholder?: string;
  options: SelectOption[];
  message?: string;
}

function HookSelectInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  error,
  onChange,
  required = false,
  placeholder = "Select an option",
  options,
  message,
}: HookSelectInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <div>
          <label className="text-base flex gap-1 font-medium wrap-anywhere">
            <EllipsisText>{label}</EllipsisText>
            {required && <span className="text-red-500 text-sm">*</span>}
          </label>
        </div>
        {message && (
          <p className="text-xs opacity-80 dark:text-dark-fg-muted">
            {message}
          </p>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedOption =
            options.find((opt) => opt.value === field.value) || options[0];

          const selectedForListbox: FilterOptions = {
            id: selectedOption?.id || 0,
            name: selectedOption?.name || placeholder,
          };

          const handleChange = (filterOption: FilterOptions) => {
            const fullOption = options.find(
              (opt) => opt.id === filterOption.id
            );
            if (fullOption) {
              field.onChange(fullOption.value);
              if (onChange) {
                onChange(fullOption);
              }
            }
          };

          return (
            <NewListbox
              selected={selectedForListbox}
              handleChange={handleChange}
            >
              <ListBoxBtn className="border-light-fg-muted/20 dark:border-dark-fg-muted/20 border h-9 bg-transparent">
                {selectedOption?.name || placeholder}
              </ListBoxBtn>
              <ListboxOpts>
                {options.map((option) => (
                  <ListboxOptn
                    key={option.id}
                    data={{ id: option.id, name: option.name }}
                    selected={selectedForListbox}
                  />
                ))}
              </ListboxOpts>
            </NewListbox>
          );
        }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default HookSelectInput;
