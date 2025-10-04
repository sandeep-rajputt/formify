import {
  formFieldOptionsSchema,
  formFieldsSchema,
  FormInitialStateSchema,
  textInputSchema,
  addFieldActionSchema,
  formSettingSchema,
  updateFormSettingActionSchema,
  longTextInputSchema,
  numberInputSchema,
  emailInputSchema,
  dateInputSchema,
  checkboxInputSchema,
  selectInputSchema,
  headingSchema,
  paragraphSchema,
  dividerSchema,
  listSchema,
} from "@/schema/formSchema";
import z from "zod";

// for addFormField.tsx
export type FormFieldOptions = z.infer<typeof formFieldOptionsSchema>;

// for formContainer.tsx
export type FormFields = z.infer<typeof formFieldsSchema>;

// for formFieldSlice.tsx
export type FormInitialState = z.infer<typeof FormInitialStateSchema>;

// addForm(state, action) // for this action
export type AddFieldAction = z.infer<typeof addFieldActionSchema>;

// for updateFormSetting(state, action) // for this action
export type UpdateFormSettingAction = z.infer<
  typeof updateFormSettingActionSchema
>;

// for form setting
export type FormSetting = z.infer<typeof formSettingSchema>;

// textInputSchema
export type TextInputField = z.infer<typeof textInputSchema>;

// longTextInputSchema
export type LongTextInputField = z.infer<typeof longTextInputSchema>;

// numberInputSchema
export type NumberInputField = z.infer<typeof numberInputSchema>;

// emailInputSchema
export type EmailInputField = z.infer<typeof emailInputSchema>;

// dateInputSchema
export type DateInputField = z.infer<typeof dateInputSchema>;

// checkboxInputSchema
export type CheckboxInputField = z.infer<typeof checkboxInputSchema>;

// selectInputSchema
export type SelectInputField = z.infer<typeof selectInputSchema>;

// headingSchema
export type HeadingField = z.infer<typeof headingSchema>;

// paragraphSchema
export type ParagraphField = z.infer<typeof paragraphSchema>;

// dividerSchema
export type DividerField = z.infer<typeof dividerSchema>;

// listSchema
export type ListField = z.infer<typeof listSchema>;
