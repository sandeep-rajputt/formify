import type { FormFields } from "@/types/form-types";
import type { IForm } from "@/models/Form.model";

// Serialized form data type for Client Components
export type SerializedForm = {
  formId: string;
  title: string;
  description?: string;
  theme: "light" | "dark" | "system";
  fields: FormFields[];
};

/**
 * Converts MongoDB form document to plain object with only essential fields
 * Returns: formId, title, description, theme, fields
 */
export function serializeForm(form: IForm): SerializedForm {
  return {
    formId: form.formId,
    title: form.title,
    description: form.description,
    theme: form.theme,
    fields: JSON.parse(JSON.stringify(form.fields)), // Deep clone to remove MongoDB methods
  };
}

/**
 * Validates that an object is safe to pass to Client Components
 */
export function isSerializable(obj: unknown): boolean {
  try {
    JSON.stringify(obj);
    return true;
  } catch {
    return false;
  }
}
