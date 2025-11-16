import z from "zod";
import isValidRegex from "@/utils/isValidRegex";
import mongoose from "mongoose";

const textInputFieldSchema = z.object({
  name: z.literal("Text Input"),
  value: z.literal("text-input"),
  type: z.literal("input"),
});

const longTextInputFieldSchema = z.object({
  name: z.literal("Long Text"),
  value: z.literal("long-text"),
  type: z.literal("input"),
});

const numberInputFieldSchema = z.object({
  name: z.literal("Number"),
  value: z.literal("number"),
  type: z.literal("input"),
});

const emailInputFieldSchema = z.object({
  name: z.literal("Email"),
  value: z.literal("email"),
  type: z.literal("input"),
});

const dateInputFieldSchema = z.object({
  name: z.literal("Date"),
  value: z.literal("date"),
  type: z.literal("input"),
});

const checkboxInputFieldSchema = z.object({
  name: z.literal("Checkbox"),
  value: z.literal("checkbox"),
  type: z.literal("input"),
});

const selectInputFieldSchema = z.object({
  name: z.literal("Select"),
  value: z.literal("select"),
  type: z.literal("input"),
});

const headingFieldSchema = z.object({
  name: z.literal("Heading"),
  value: z.literal("heading"),
  type: z.literal("style"),
});

const paragraphFieldSchema = z.object({
  name: z.literal("Paragraph"),
  value: z.literal("paragraph"),
  type: z.literal("style"),
});

const dividerFieldSchema = z.object({
  name: z.literal("Divider"),
  value: z.literal("divider"),
  type: z.literal("style"),
});

const listFieldSchema = z.object({
  name: z.literal("List"),
  value: z.literal("list"),
  type: z.literal("input"),
});

// any of paragraphFieldSchema, listFieldSchema
export const formFieldOptionsSchema = z.union([
  textInputFieldSchema,
  longTextInputFieldSchema,
  numberInputFieldSchema,
  emailInputFieldSchema,
  dateInputFieldSchema,
  checkboxInputFieldSchema,
  selectInputFieldSchema,
  headingFieldSchema,
  paragraphFieldSchema,
  dividerFieldSchema,
  listFieldSchema,
]);

const validId = z.string().refine(
  (value) => {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(value); // ✅ return boolean
  },
  {
    message: "Invalid UUIDv4 format",
  }
);

export const textInputSchema = textInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .min(1, { message: "Label is required" })
      .max(50, { message: "Label can't be more than 50 characters" }),
    description: z
      .string()
      .max(500, { message: "Description can't be more than 500 characters" })
      .optional(),
    placeholder: z
      .string()
      .max(50, { message: "Placeholder can't be more than 50 characters" })
      .min(4, { message: "Placeholder can't be less than 4 characters" }),
    required: z.boolean().default(false),
    regex: z
      .string()
      .max(100, { message: "Regex can't be more than 100 characters" })
      .optional(),
    regexErrorMessage: z
      .string()
      .max(50, {
        message: "Regex error message can't be more than 50 characters",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.regex) {
      const regexValid = isValidRegex(data.regex);
      if (!regexValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid regex pattern",
          path: ["regex"],
        });
      } else {
        if (!data.regexErrorMessage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Regex error message is required when regex is provided",
            path: ["regexErrorMessage"],
          });
        }
      }
    }
  });

export const longTextInputSchema = longTextInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .min(1, { message: "Label is required" })
      .max(50, { message: "Label can't be more than 50 characters" }),
    description: z
      .string()
      .max(500, { message: "Description can't be more than 500 characters" })
      .optional(),
    placeholder: z
      .string()
      .max(50, { message: "Placeholder can't be more than 50 characters" })
      .optional()
      .default("Enter yor value"),
    required: z.boolean().default(false),
    regex: z
      .string()
      .max(100, { message: "Regex can't be more than 100 characters" })
      .optional(),
    regexErrorMessage: z
      .string()
      .max(50, {
        message: "Regex error message can't be more than 50 characters",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.regex) {
      const regexValid = isValidRegex(data.regex);
      if (!regexValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid regex pattern",
          path: ["regex"],
        });
      } else {
        if (!data.regexErrorMessage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Regex error message is required when regex is provided",
            path: ["regexErrorMessage"],
          });
        }
      }
    }
  });

export const numberInputSchema = numberInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .min(1, { message: "Label is required" })
      .max(50, { message: "Label can't be more than 50 characters" }),
    placeholder: z
      .string()
      .max(50, { message: "Placeholder can't be more than 50 characters" })
      .optional()
      .default("Enter yor value"),
    description: z
      .string()
      .max(500, { message: "Description can't be more than 500 characters" })
      .optional(),
    required: z.boolean().default(false),
    min: z.number().max(9007199254740990, {
      message: "Min value cannot exceed 9007199254740990",
    }),
    max: z.number().max(9007199254740991, {
      message: "Max value cannot exceed 9007199254740991",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.min !== undefined && data.max !== undefined) {
      if (data.min > data.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min value cannot be greater than max value",
          path: ["min"],
        });
      }
      if (data.min < -9007199254740991) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min value cannot be less than -9007199254740991",
          path: ["min"],
        });
      }
      if (data.max < -9007199254740990) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max value cannot be less than -9007199254740990",
          path: ["max"],
        });
      }
    }
  });

export const emailInputSchema = emailInputFieldSchema.extend({
  id: validId,
  label: z
    .string()
    .min(1, { message: "Label is required" })
    .max(50, { message: "Label can't be more than 50 characters" }),
  placeholder: z
    .string()
    .max(50, { message: "Placeholder can't be more than 50 characters" })
    .optional()
    .default("Enter yor email"),
  required: z.boolean().default(false),
  description: z
    .string()
    .max(500, { message: "Description can't be more than 500 characters" })
    .optional(),
});

export const dateInputSchema = dateInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .min(1, { message: "Label is required" })
      .max(50, { message: "Label can't be more than 50 characters" }),
    placeholder: z
      .string()
      .max(50, { message: "Placeholder can't be more than 50 characters" })
      .optional()
      .default("Select a date"),
    description: z
      .string()
      .max(500, { message: "Description can't be more than 500 characters" })
      .optional(),
    required: z.boolean().default(false),
    mode: z.enum(["single", "range"]).default("single"),
    minDate: z.string().optional(),
    maxDate: z.string().optional(),
    weekStartsOn: z.enum(["0", "1"]).default("0"),
  })
  .superRefine((data, ctx) => {
    if (
      data.minDate &&
      data.maxDate &&
      data.minDate !== null &&
      data.maxDate !== null
    ) {
      const minDateObj = new Date(data.minDate);
      const maxDateObj = new Date(data.maxDate);
      if (minDateObj > maxDateObj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min date cannot be greater than max date",
          path: ["minDate"],
        });
      }
    }
  });

export const checkboxInputSchema = checkboxInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .max(50, { message: "Label can't be more than 50 characters" })
      .optional(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description can't be more than 500 characters" }),
    required: z.boolean().default(false),
    errorMessage: z
      .string()
      .max(50, {
        message: "Error message can't be more than 50 characters",
      })
      .optional(),
    defaultValue: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.required && !data.errorMessage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Error message is required when checkbox is required",
        path: ["errorMessage"],
      });
    }
  });

export const selectInputSchema = selectInputFieldSchema
  .extend({
    id: validId,
    label: z
      .string()
      .min(1, { message: "Label is required" })
      .max(50, { message: "Label can't be more than 50 characters" }),
    description: z
      .string()
      .max(500, { message: "Description can't be more than 500 characters" })
      .optional(),
    options: z.array(
      z.object({
        label: z
          .string()
          .min(1, { message: "Option label is required" })
          .max(50, {
            message: "Option label can't be more than 50 characters",
          }),
        id: validId,
      })
    ),
    required: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.options.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one option is required",
        path: ["options"],
      });
    } else if (data.options.length > 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Options can't be more than 50",
        path: ["options"],
      });
    }
  });

export const headingSchema = headingFieldSchema.extend({
  id: validId,
  label: z
    .string()
    .min(1, { message: "Label is required" })
    .max(50, { message: "Label can't be more than 50 characters" }),
  level: z
    .union([z.literal("h1"), z.literal("h2"), z.literal("h3")])
    .default("h1"),
});

export const paragraphSchema = paragraphFieldSchema.extend({
  id: validId,
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(500, { message: "Content can't be more than 500 characters" }),
});

export const dividerSchema = dividerFieldSchema.extend({
  id: validId,
  height: z.enum(["0.5", "1", "2", "3", "4"]).default("1"),
  spaceTop: z.enum(["5", "10", "15", "20", "25", "30"]).default("5"),
  spaceBottom: z.enum(["5", "10", "15", "20", "25", "30"]).default("5"),
});

export const listSchema = listFieldSchema.extend({
  id: validId,
  label: z
    .string()
    .min(1, { message: "Label is required" })
    .max(50, { message: "Label can't be more than 50 characters" }),
  items: z
    .array(
      z
        .string()
        .min(1, { message: "List item cannot be empty" })
        .max(100, { message: "List item can't be more than 50 characters" })
    )
    .min(1, { message: "At least one list item is required" })
    .max(50, { message: "List can't have more than 50 items" }),
  ordered: z.boolean().default(false),
});

export const formFieldsSchema = z.union([
  textInputSchema,
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
]);

export const formSettingSchema = z.object({
  formName: z
    .string()
    .min(1, { message: "Form name is required" })
    .max(50, { message: "Form name can't be more than 50 characters" }),
  formDescription: z
    .string()
    .max(500, {
      message: "Form description can't be more than 500 characters",
    })
    .optional(),
  theme: z.enum(["light", "dark", "system"]),
});

// chatSchema
export const chatSchema = z.object({
  role: z.enum(["user", "model"]),
  parts: z.array(
    z.object({
      text: z.string(),
    })
  ),
});

export const chatsSchema = z.array(chatSchema);

// chatFormIdSchema
export const formIdSchema = z.union([validId, z.literal("new-form")]);

//conversation
export const conversationSchema = chatsSchema;

// formFieldInitialState
export const FormSchema = z.object({
  id: formIdSchema,
  fields: z
    .array(formFieldsSchema)
    .max(50, {
      message: "Form can't have more than 50 fields",
    })
    .min(2, { message: "Your form must have at least 2 fields" }),
  setting: formSettingSchema,
  conversation: conversationSchema,
});

export const FormsSchema = z.array(FormSchema);

export const addFieldActionSchema = z.object({
  payload: z.object({
    data: formFieldsSchema,
    index: z.number().nonnegative(),
    formId: formIdSchema,
  }),
  type: z.string(),
});

export const updateFormSettingActionSchema = z.object({
  payload: formSettingSchema,
});

export const tivoraAiResponseSystemSchema = z
  .object({
    form: z
      .object({
        fields: z.array(formFieldsSchema),
        setting: formSettingSchema,
      })
      .optional(),
    formFields: z.array(formFieldsSchema).optional(),
    formSetting: formSettingSchema.optional(),
    addField: z
      .array(
        z.object({
          data: formFieldsSchema,
          index: z.number(),
        })
      )
      .optional(),
    remove: z.array(z.string().uuid()).optional(),
    updateField: z.array(formFieldsSchema).optional(),
    addFieldAfter: z
      .array(
        z.object({
          data: formFieldsSchema,
          afterId: validId,
        })
      )
      .optional(),
    addFieldBefore: z
      .array(
        z.object({
          data: formFieldsSchema,
          beforeId: validId,
        })
      )
      .optional(),
    moveField: z
      .array(
        z.object({
          id: validId,
          newIndex: z.number(),
        })
      )
      .optional(),
  })
  .optional();

// tivoraAiResponseSchema
export const tivoraAiResponseSchema = z.object({
  system: tivoraAiResponseSystemSchema,
  userMessage: z.string(),
});

export const IFormSchema = z.object({
  owner: z.instanceof(mongoose.Types.ObjectId),
  formId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  theme: z.enum(["light", "dark", "system"]),
  fields: z.array(formFieldsSchema),
  status: z.enum(["draft", "published"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  submissionsCount: z.number(),
  views: z.number(),
});
