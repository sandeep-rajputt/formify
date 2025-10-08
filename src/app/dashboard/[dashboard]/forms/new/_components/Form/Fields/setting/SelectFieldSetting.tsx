"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { FormId, SelectInputField } from "@/types/form-types";
import type { RootState } from "@/Store/store";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectInputSchema } from "@/schema/formSchema";
import { updateSelectField } from "@/Store/slice/formSlice";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface SelectFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function SelectFieldSetting({ hide, id, formId }: SelectFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state: RootState) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as SelectInputField;

  const [options, setOptions] = useState<Array<{ label: string; id: string }>>(
    field?.options || [
      { label: "Option 1", id: uuidv4() },
      { label: "Option 2", id: uuidv4() },
    ]
  );
  const [optionErrors, setOptionErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(selectInputSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      description: field?.description,
      required: field?.required,
      options: field?.options || [
        { label: "Option 1", id: uuidv4() },
        { label: "Option 2", id: uuidv4() },
      ],
    },
  });

  if (field?.value !== "select") {
    hide();
    return null;
  }

  function validateOption(value: string): string | null {
    if (!value.trim()) {
      return "Option label is required";
    }
    if (value.length > 50) {
      return "Option label can't be more than 50 characters";
    }
    return null;
  }

  function onSubmit(data: SelectInputField) {
    const formData = { ...data, options };
    dispatch(updateSelectField({ data: formData, formId }));
    hide();
  }

  function addOption() {
    if (options.length >= 50) return;
    const newOptions = [
      ...options,
      { label: `Option ${options.length + 1}`, id: uuidv4() },
    ];
    setOptions(newOptions);
    setValue("options", newOptions);
    setOptionErrors([...optionErrors, ""]);
  }

  function removeOption(index: number) {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      const newErrors = optionErrors.filter((_, i) => i !== index);
      setOptions(newOptions);
      setValue("options", newOptions);
      setOptionErrors(newErrors);
    }
  }

  function updateOption(index: number, value: string) {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], label: value };
    setOptions(newOptions);
    setValue("options", newOptions);

    // Validate individual option
    const newErrors = [...optionErrors];
    const error = validateOption(value);
    newErrors[index] = error || "";
    setOptionErrors(newErrors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextInput
          register={register("label")}
          label="Select Field Label"
          error={errors.label?.message as string}
          placeholder="Enter select field label"
          required
        />
        <HookTextInput
          register={register("description")}
          label="Description"
          error={errors.description?.message}
          placeholder="Enter description"
        />
        <HookSelectInput
          name="required"
          control={control}
          label="Required"
          message="Is this field required?"
          error={errors.required?.message}
          options={[
            { id: 1, name: "Yes", value: true },
            { id: 2, name: "No", value: false },
          ]}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">
              Options ({options.length}/50)
            </label>
            <button
              type="button"
              onClick={addOption}
              disabled={options.length >= 50}
              className={`flex items-center gap-1 px-2 py-1 text-sm rounded ${
                options.length >= 50
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Option
            </button>
          </div>

          {options.map((option, index) => (
            <div key={option.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder="Enter option label (max 50 characters)"
                    maxLength={50}
                    className={`w-full border rounded-md focus:outline-none h-9 px-2 text-light-text/95 dark:text-dark-text/95 text-sm ${
                      optionErrors[index]
                        ? "border-red-500"
                        : "border-light-fg-muted/20 dark:border-dark-fg-muted/20"
                    }`}
                  />
                </div>
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
              {optionErrors[index] && (
                <p className="text-red-500 text-xs ml-1">
                  {optionErrors[index]}
                </p>
              )}
              <div className="text-xs text-gray-500 ml-1">
                {option.label.length}/50 characters
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 px-4 py-4 border-t border-light-fg/10 dark:border-dark-fg/10">
        <div className="flex justify-end gap-3">
          <button
            onClick={hide}
            className="px-4 py-2 text-sm border rounded-md border-light-fg/20 dark:border-dark-fg/20 hover:bg-light-fg/5 dark:hover:bg-dark-fg/5"
          >
            Cancel
          </button>
          <PrimarySquareButton>Save Settings</PrimarySquareButton>
        </div>
      </div>
    </form>
  );
}

export default SelectFieldSetting;
