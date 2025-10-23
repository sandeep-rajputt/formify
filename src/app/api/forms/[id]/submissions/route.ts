import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import { Submission } from "@/models/Submission.model";
import { getSubmissionsSchema } from "@/schema/submissionSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to database
    await connectDB();

    // Get form ID from URL
    const { id: formId } = await params;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Validate query parameters
    const validatedQuery = getSubmissionsSchema.parse({ page, limit });

    // Check if the form exists
    const form = await Form.findOne({ formId }).lean();
    if (!form) {
      return NextResponse.json(
        { success: false, message: "Form not found" },
        { status: 404 }
      );
    }

    // Calculate skip for pagination
    const skip = (validatedQuery.page - 1) * validatedQuery.limit;

    // Get submissions
    const submissions = await Submission.find({ formId })
      .sort({ submittedAt: -1 }) // Latest first
      .skip(skip)
      .limit(validatedQuery.limit)
      .lean();

    // Get total count for pagination
    const totalSubmissions = await Submission.countDocuments({ formId });
    const totalPages = Math.ceil(totalSubmissions / validatedQuery.limit);

    return NextResponse.json({
      success: true,
      data: {
        submissions,
        pagination: {
          currentPage: validatedQuery.page,
          totalPages,
          totalSubmissions,
          hasNextPage: validatedQuery.page < totalPages,
          hasPrevPage: validatedQuery.page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submissions",
      },
      { status: 500 }
    );
  }
}
