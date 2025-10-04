"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { CheckboxInputField } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkboxInputSchema } from "@/schema/formSchema";
import { updateCheckboxField } from "@/Store/slice/formSlice";

interface CheckBoxFieldSettingProps {
  hide: () => void;
  id: string;
}

function CheckBoxFieldSetting({ hide, id }: CheckBoxFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state) =>
    state.form.fields.find(
      (field) => field.id === id && field.value === "checkbox"
    )
  ) as CheckboxInputField;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkboxInputSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      description: field?.description,
      required: field?.required,
      defaultValue: field?.defaultValue,
      errorMessage: field?.errorMessage,
    },
  });

  if (field?.value !== "checkbox") {
    hide();
    return null;
  }

  function onSubmit(data: CheckboxInputField) {
    dispatch(updateCheckboxField(data));
    hide();
  }

  const requiredValue = watch("required");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextInput
          register={register("label")}
          label="Checkbox Label"
          error={errors.label?.message as string}
          placeholder="Enter checkbox label"
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
          message="Should this field be true?"
          error={errors.required?.message}
          options={[
            { id: 1, name: "Yes", value: true },
            { id: 2, name: "No", value: false },
          ]}
        />

        {/* when required is true then show errorMessage input  */}
        {requiredValue && (
          <HookTextInput
            register={register("errorMessage")}
            label="Error Message"
            error={errors.errorMessage?.message}
            placeholder="Enter error message for required field"
            message="This message will be displayed if the field is left unchecked when required."
          />
        )}

        <HookSelectInput
          name="defaultValue"
          control={control}
          label="Default Value"
          message="Should this checkbox be checked by default?"
          error={errors.defaultValue?.message}
          options={[
            { id: 1, name: "Checked", value: true },
            { id: 2, name: "Unchecked", value: false },
          ]}
        />
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

export default CheckBoxFieldSetting;
