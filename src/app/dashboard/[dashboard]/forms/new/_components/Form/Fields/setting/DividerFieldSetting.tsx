"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { DividerField, FormId } from "@/types/form-types";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { dividerSchema } from "@/schema/formSchema";
import { updateDividerField } from "@/Store/slice/formSlice";
import type { RootState } from "@/Store/store";

interface DividerFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function DividerFieldSetting({ hide, id, formId }: DividerFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state: RootState) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as DividerField;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dividerSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      height: field?.height,
      spaceTop: field?.spaceTop,
      spaceBottom: field?.spaceBottom,
    },
  });

  if (field?.value !== "divider") {
    hide();
    return null;
  }

  function onSubmit(data: DividerField) {
    dispatch(updateDividerField({ data, formId }));
    hide();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookSelectInput
          name="height"
          control={control}
          label="Divider Height"
          message="Choose the thickness of the divider line"
          error={errors.height?.message}
          options={[
            { id: 1, name: "0.5px (Thin)", value: "0.5" },
            { id: 2, name: "1px (Normal)", value: "1" },
            { id: 3, name: "2px (Medium)", value: "2" },
            { id: 4, name: "3px (Thick)", value: "3" },
            { id: 5, name: "4px (Very Thick)", value: "4" },
          ]}
        />
        <HookSelectInput
          name="spaceTop"
          control={control}
          label="Top Spacing"
          message="Space above the divider"
          error={errors.spaceTop?.message}
          options={[
            { id: 1, name: "5px", value: "5" },
            { id: 2, name: "10px", value: "10" },
            { id: 3, name: "15px", value: "15" },
            { id: 4, name: "20px", value: "20" },
            { id: 5, name: "25px", value: "25" },
            { id: 6, name: "30px", value: "30" },
          ]}
        />
        <HookSelectInput
          name="spaceBottom"
          control={control}
          label="Bottom Spacing"
          message="Space below the divider"
          error={errors.spaceBottom?.message}
          options={[
            { id: 1, name: "5px", value: "5" },
            { id: 2, name: "10px", value: "10" },
            { id: 3, name: "15px", value: "15" },
            { id: 4, name: "20px", value: "20" },
            { id: 5, name: "25px", value: "25" },
            { id: 6, name: "30px", value: "30" },
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

export default DividerFieldSetting;
