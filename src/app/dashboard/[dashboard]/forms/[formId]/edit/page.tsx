import ClientEditPage from "./ClientPage";
import type { FormId, FormFields, FormSetting } from "@/types/form-types";

interface Response {
  message: "string";
  data: {
    formId: FormId;
    title: string;
    description: string | undefined;
    theme: "light" | "dark" | "system";
    fields: FormFields[];
  };
}

interface FormData {
  formId: FormId;
  data: {
    fields: FormFields[];
    setting: FormSetting;
  };
}

async function EditForm({
  params,
}: {
  params: { dashboard: string; formId: string };
}) {
  const { formId } = await params;
  const response: Response | undefined = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL as string}/api/forms/${formId}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch(() => undefined);

  if (!response) {
    return <div>Invalid form</div>;
  }

  const formData: FormData = {
    formId: formId,
    data: {
      fields: response.data.fields,
      setting: {
        formName: response.data.title,
        theme: response.data.theme,
        formDescription: response.data.description,
      },
    },
  };

  return <ClientEditPage formData={formData} />;
}

export default EditForm;
