"use client";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { createForm } from "@/Store/slice/formSlice";
import type { FormId, FormFields, FormSetting } from "@/types/form-types";
import NewFormPageStructure from "@/app/dashboard/[dashboard]/forms/new/NewFormPageStructure";

function ClientEditPage({
  formData,
}: {
  formData: {
    formId: FormId;
    data: {
      fields: FormFields[];
      setting: FormSetting;
    };
  };
}) {
  const dispatch = useAppDispatch();
  dispatch(createForm(formData));
  return <NewFormPageStructure chatFormId={formData.formId} />;
}

export default ClientEditPage;
