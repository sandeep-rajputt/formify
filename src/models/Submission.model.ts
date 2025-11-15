import mongoose, { Document, Schema, Model } from "mongoose";

// Simple interface for a form submission
export interface ISubmission extends Document {
  formId: string;
  owner: string;
  submittedAt: Date;
  answers: Record<string, unknown>; // fieldId -> answer value
  submitterInfo?: {
    ipAddress?: string;
    userAgent?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Simple schema for storing form submissions
const submissionSchema: Schema<ISubmission> = new Schema(
  {
    formId: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    answers: {
      type: Object,
      required: true,
    },
    submitterInfo: {
      ipAddress: String,
      userAgent: String,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Create index for better performance when searching by formId
submissionSchema.index({ formId: 1, submittedAt: -1 });

export const Submission: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", submissionSchema);

export default Submission;
