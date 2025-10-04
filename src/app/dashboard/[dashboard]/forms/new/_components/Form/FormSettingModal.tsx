"use client";

import PrimaryCard from "@/component/common/PrimaryCard";
import PrimarySquareButton from "@/component/common/PrimarySquareButton";
import HookTextInput from "@/component/react-hook-form-inputs/HookTextInput";
import HookTextAreaInput from "@/component/react-hook-form-inputs/HookTextAreaInput";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import type { FormSetting } from "@/types/form-types";
import { formSettingSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxToolkit";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import { updateFormSetting } from "@/Store/slice/formSlice";

interface FormSettingModalProps {
  hide: () => void;
}

function FormSettingModal({ hide }: FormSettingModalProps) {
  const dispatch = useAppDispatch();
  const formSetting = useAppSelector((state) => state.form.setting);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSetting>({
    resolver: zodResolver(formSettingSchema),
    defaultValues: {
      formName: formSetting.formName,
      formDescription: formSetting.formDescription,
      theme: formSetting.theme,
    },
  });
  const Box = useRef<HTMLDivElement>(null);

  function handleOutterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (Box.current === e.target) {
      hide();
    }
  }

  function onSubmit(data: FormSetting) {
    dispatch(updateFormSetting(data));
    hide();
  }

  return (
    <div
      className="fixed inset-0 z-5000 flex scrollbar overflow-y-auto px-5 py-10 w-full backdrop-blur-sm"
      onClick={handleOutterClick}
      ref={Box}
    >
      <PrimaryCard className="flex flex-col max-w-md w-full h-fit m-auto border border-light-fg-muted/20 dark:border-dark-fg-muted/20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-shrink-0 px-4 py-2">
            <h2 className="text-xl font-semibold">Form Settings</h2>
          </div>

          <div className="flex-1  px-4 pb-4 pt-4">
            <div className="space-y-6 mb-5 mt-3">
              <HookTextInput
                register={register("formName")}
                label="Form Title"
                error={errors.formName?.message}
                placeholder="Enter form title"
                required
              />

              <HookTextAreaInput
                register={register("formDescription")}
                label="Description"
                error={errors.formDescription?.message}
                placeholder="Enter form description"
                rows={3}
              />

              <HookSelectInput
                name="theme"
                control={control}
                label="Theme"
                message="This theme will be applied to your form. When you share your form, the selected theme will be used to display it to others."
                error={errors.theme?.message}
                options={[
                  { id: 1, name: "Light theme", value: "light" },
                  { id: 2, name: "Dark theme", value: "dark" },
                  { id: 3, name: "User's System theme", value: "system" },
                ]}
              />
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
      </PrimaryCard>
    </div>
  );
}

export default FormSettingModal;
