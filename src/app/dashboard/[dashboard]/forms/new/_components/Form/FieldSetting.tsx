"use client";

import React, { useRef } from "react";
import PrimaryCard from "@/component/common/PrimaryCard";
import TextFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/TextFieldSetting";
import { FormFieldOptions, FormId } from "@/types/form-types";
import LongTextFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/LongTextFieldSetting";
import NumberFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/NumberFieldSetting";
import EmailFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/EmailFieldSetting";
import DateFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/DateFieldSetting";
import CheckBoxFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/CheckBoxFieldSetting";
import SelectFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/SelectFieldSetting";
import HeadingFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/HeadingFieldSetting";
import ParagraphFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/ParagraphFieldSetting";
import DividerFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/DividerFieldSetting";
import ListFieldSetting from "@/app/dashboard/[dashboard]/forms/new/_components/Form/Fields/setting/ListFieldSetting";

interface FieldSetting {
  hide: () => void;
  id: string;
  fieldInfo: FormFieldOptions;
  formId: FormId;
}

function FieldSetting({ hide, id, fieldInfo, formId }: FieldSetting) {
  const Box = useRef<HTMLDivElement>(null);

  function handleOutterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (Box.current === e.target) {
      hide();
    }
  }

  return (
    <div
      className="fixed inset-0 z-5000 flex scrollbar overflow-y-auto px-5 py-10 w-full backdrop-blur-sm"
      onClick={handleOutterClick}
      ref={Box}
    >
      <PrimaryCard className="flex flex-col max-w-md w-full h-fit m-auto border border-light-fg-muted/20 dark:border-dark-fg-muted/20">
        <div className="flex-shrink-0 px-4 py-2">
          <h2 className="text-xl font-semibold">Field Settings</h2>
          <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted">
            Field id: {id}
          </p>
        </div>
        <div className="flex-1  px-4 pb-4 pt-4">
          {fieldInfo.value === "text-input" && (
            <TextFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "long-text" && (
            <LongTextFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "number" && (
            <NumberFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "email" && (
            <EmailFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "date" && (
            <DateFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "checkbox" && (
            <CheckBoxFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "select" && (
            <SelectFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "heading" && (
            <HeadingFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "paragraph" && (
            <ParagraphFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "divider" && (
            <DividerFieldSetting hide={hide} id={id} formId={formId} />
          )}
          {fieldInfo.value === "list" && (
            <ListFieldSetting hide={hide} id={id} formId={formId} />
          )}
        </div>
      </PrimaryCard>
    </div>
  );
}

export default FieldSetting;
