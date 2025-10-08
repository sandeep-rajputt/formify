"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { FormId, HeadingField } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { headingSchema } from "@/schema/formSchema";
import { updateHeadingField } from "@/Store/slice/formSlice";
import type { RootState } from "@/Store/store";

interface HeadingFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function HeadingFieldSetting({ hide, id, formId }: HeadingFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state: RootState) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as HeadingField;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(headingSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      level: field?.level,
    },
  });

  if (field?.value !== "heading") {
    hide();
    return null;
  }

  function onSubmit(data: HeadingField) {
    dispatch(updateHeadingField({ data, formId }));
    hide();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextInput
          register={register("label")}
          label="Heading Text"
          error={errors.label?.message as string}
          placeholder="Enter heading text"
          required
        />
        <HookSelectInput
          name="level"
          control={control}
          label="Heading Level"
          message="Choose the heading level (H1, H2, or H3)"
          error={errors.level?.message}
          options={[
            { id: 1, name: "H1 (Largest)", value: "h1" },
            { id: 2, name: "H2 (Medium)", value: "h2" },
            { id: 3, name: "H3 (Smallest)", value: "h3" },
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

export default HeadingFieldSetting;
