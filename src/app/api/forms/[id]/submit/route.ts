import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import { Submission } from "@/models/Submission.model";
import { createSubmissionSchema } from "@/schema/submissionSchema";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to database
    await connectDB();

    // Get form ID from URL
    const { id: formId } = await params;

    // Get the form data from request body
    const body = await request.json();

    // Validate the submission data
    const validatedData = createSubmissionSchema.parse(body);

    // Check if the form exists
    const form = await Form.findOne({ formId }).lean();
    if (!form) {
      return NextResponse.json(
        { success: false, message: "Form not found" },
        { status: 404 }
      );
    }

    // Check if form is published
    if (form.status !== "published") {
      return NextResponse.json(
        { success: false, message: "Form is not accepting submissions" },
        { status: 400 }
      );
    }

    // Get user info
    const submitterInfo = {
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Create new submission
    const submission = new Submission({
      formId,
      submittedAt: new Date(),
      answers: validatedData.answers,
      submitterInfo,
    });

    // Save to database
    await submission.save();

    // Update form submission count
    await Form.findOneAndUpdate({ formId }, { $inc: { submissionsCount: 1 } });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again.",
      },
      { status: 500 }
    );
  }
}
