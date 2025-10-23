import z from "zod";

// Simple schema for when someone submits a form
export const submissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
  submittedAt: z.date().default(() => new Date()),
  answers: z.record(z.string(), z.any()), // fieldId -> answer value
  submitterInfo: z
    .object({
      ipAddress: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
});

// Schema for creating a new submission (what we receive from the form)
export const createSubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
  answers: z
    .record(z.string(), z.any())
    .refine(
      (answers) => Object.keys(answers).length > 0,
      "At least one answer is required"
    ),
});

// Schema for querying submissions (for getting submissions from database)
export const getSubmissionsSchema = z.object({
  formId: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});

// Export types for TypeScript
export type Submission = z.infer<typeof submissionSchema>;
export type CreateSubmission = z.infer<typeof createSubmissionSchema>;
export type GetSubmissions = z.infer<typeof getSubmissionsSchema>;
