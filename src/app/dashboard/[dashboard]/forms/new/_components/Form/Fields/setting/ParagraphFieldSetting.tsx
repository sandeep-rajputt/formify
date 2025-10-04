"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { ParagraphField } from "@/types/form-types";
import HookTextAreaInput from "@/component/react-hook-form-inputs/HookTextAreaInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { paragraphSchema } from "@/schema/formSchema";
import { updateParagraphField } from "@/Store/slice/formSlice";
import type { RootState } from "@/Store/store";

interface ParagraphFieldSettingProps {
  hide: () => void;
  id: string;
}

function ParagraphFieldSetting({ hide, id }: ParagraphFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state: RootState) =>
    state.form.fields.find(
      (fieldItem) => fieldItem.id === id && fieldItem.value === "paragraph"
    )
  ) as ParagraphField;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paragraphSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      content: field?.content,
    },
  });

  if (field?.value !== "paragraph") {
    hide();
    return null;
  }

  function onSubmit(data: ParagraphField) {
    dispatch(updateParagraphField(data));
    hide();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-5">
        <HookTextAreaInput
          register={register("content")}
          label="Paragraph Content"
          error={errors.content?.message as string}
          placeholder="Enter paragraph content"
          rows={6}
          required
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

export default ParagraphFieldSetting;
