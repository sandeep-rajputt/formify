"use client";

import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import { FormId, TextInputField } from "@/types/form-types";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { textInputSchema } from "@/schema/formSchema";
import { updateTextField } from "@/Store/slice/formSlice";

interface TextFieldSettingProps {
  hide: () => void;
  id: string;
  formId: FormId;
}

function TextFieldSetting({ hide, id, formId }: TextFieldSettingProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state) =>
    state.form
      .find((form) => form.id === formId)
      ?.fields.find((field) => field.id === id)
  ) as TextInputField;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(textInputSchema),
    defaultValues: {
      name: field?.name,
      value: field?.value,
      type: field?.type,
      id: field?.id,
      label: field?.label,
      placeholder: field?.placeholder,
      description: field?.description,
      required: field?.required,
      regex: field?.regex,
      regexErrorMessage: field?.regexErrorMessage,
    },
  });

  if (field?.value !== "text-input") {
    hide();
    return null;
  }

  function onSubmit(data: TextInputField) {
    dispatch(updateTextField({ data, formId }));
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

        <HookTextInput
          register={register("regex")}
          label="Regex Pattern"
          error={errors.regex?.message}
          placeholder="Enter regex pattern"
        />
        <HookTextInput
          register={register("regexErrorMessage")}
          label="Regex Error Message"
          error={errors.regexErrorMessage?.message}
          placeholder="Enter regex error message"
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

export default TextFieldSetting;
