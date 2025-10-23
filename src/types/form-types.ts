import {
  formFieldOptionsSchema,
  formFieldsSchema,
  FormSchema,
  FormsSchema,
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
  formIdSchema,
  chatSchema,
  chatsSchema,
  tivoraAiResponseSchema,
  tivoraAiResponseSystemSchema,
  IFormSchema,
} from "@/schema/formSchema";

import z from "zod";

// for addFormField.tsx
export type FormFieldOptions = z.infer<typeof formFieldOptionsSchema>;

// for formContainer.tsx
export type FormFields = z.infer<typeof formFieldsSchema>;

// for formSlice.ts
export type Form = z.infer<typeof FormSchema>;
export type Forms = z.infer<typeof FormsSchema>;

// addForm(state, action) // for this action
export type AddFieldAction = z.infer<typeof addFieldActionSchema>;

// for updateFormSetting(state, action) // for this action
export type UpdateFormSettingAction = z.infer<
  typeof updateFormSettingActionSchema
>;

// chatSchema
export type Chat = z.infer<typeof chatSchema>;
export type Chats = z.infer<typeof chatsSchema>;

// formIdSchema
export type FormId = z.infer<typeof formIdSchema>;

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

// tivoraAiResponseSchema
export type TivoraAiResponse = z.infer<typeof tivoraAiResponseSchema>;

// tivoraAiResponseSystemSchema
export type tivoraAiResponseSystem = z.infer<
  typeof tivoraAiResponseSystemSchema
>;

// IFormSchema
export type IForm = z.infer<typeof IFormSchema>;
// Simple submission types
import {
  submissionSchema,
  createSubmissionSchema,
  getSubmissionsSchema,
} from "@/schema/submissionSchema";

export type Submission = z.infer<typeof submissionSchema>;
export type CreateSubmission = z.infer<typeof createSubmissionSchema>;
export type GetSubmissions = z.infer<typeof getSubmissionsSchema>;
