"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { DateInputField } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import HookDatePicker from "@/component/react-hook-form-inputs/HookDatePicker";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateInputSchema } from "@/schema/formSchema";
import { updateDateField } from "@/Store/slice/formSlice";

interface DateFieldSettingProps {
  hide: () => void;
  id: string;
}

function DateFieldSetting({ hide, id }: DateFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state) =>
    state.form.fields.find((field) => field.id === id && field.value === "date")
  ) as DateInputField;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dateInputSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      placeholder: field?.placeholder,
      description: field?.description,
      required: field?.required,
      mode: field?.mode,
      minDate: field?.minDate,
      maxDate: field?.maxDate,
      weekStartsOn: field?.weekStartsOn,
    },
  });

  if (field?.value !== "date") {
    hide();
    return null;
  }

  function onSubmit(data: DateInputField) {
    dispatch(updateDateField(data));
    hide();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextInput
          register={register("label")}
          label="Form Title"
          error={errors.label?.message as string}
          placeholder="Enter form title"
          required
        />
        <HookTextInput
          register={register("placeholder")}
          label="Placeholder"
          error={errors.placeholder?.message}
          placeholder="Enter placeholder"
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
        <HookSelectInput
          name="mode"
          control={control}
          label="Date Mode"
          message="Select single date or date range"
          error={errors.mode?.message}
          options={[
            { id: 1, name: "Single Date", value: "single" },
            { id: 2, name: "Date Range", value: "range" },
          ]}
        />

        <HookDatePicker
          name="minDate"
          control={control}
          label="Minimum Date"
          error={errors.minDate?.message}
          placeholder="Select minimum date"
          mode="single"
        />

        <HookDatePicker
          name="maxDate"
          control={control}
          label="Maximum Date"
          error={errors.maxDate?.message}
          placeholder="Select maximum date"
          mode="single"
        />

        <HookSelectInput
          name="weekStartsOn"
          control={control}
          label="Week Starts On"
          message="Select which day the week starts on"
          error={errors.weekStartsOn?.message}
          options={[
            { id: 1, name: "Sunday", value: "0" },
            { id: 2, name: "Monday", value: "1" },
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

export default DateFieldSetting;
