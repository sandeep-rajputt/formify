"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { EmailInputField, FormId } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailInputSchema } from "@/schema/formSchema";
import { updateEmailField } from "@/Store/slice/formSlice";

interface EmailFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function EmailFieldSetting({ hide, id, formId }: EmailFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as EmailInputField;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      placeholder: field?.placeholder,
      description: field?.description,
      required: field?.required,
    },
  });

  if (field?.value !== "email") {
    hide();
    return null;
  }

  function onSubmit(data: EmailInputField) {
    dispatch(updateEmailField({ data, formId }));
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

export default EmailFieldSetting;
