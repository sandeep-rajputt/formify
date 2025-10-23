import mongoose, { Document, Schema, Model } from "mongoose";

export interface IForm extends Document {
  owner: mongoose.Types.ObjectId;
  formId: string;
  title: string;
  description?: string;
  theme: "light" | "dark" | "system";
  fields: Record<string, unknown>[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  submissionsCount: number;
  views: number;
}

const formSchema: Schema<IForm> = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    fields: {
      type: [Object],
      default: [],
      validate: {
        validator: function (fields: Record<string, unknown>[]) {
          return fields.length <= 50;
        },
        message: "Form can't have more than 50 fields",
      },
    },
    formId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    submissionsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Form: Model<IForm> =
  mongoose.models.Form || mongoose.model<IForm>("Form", formSchema);
