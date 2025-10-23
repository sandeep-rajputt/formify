import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form.model";
import connectDB from "@/lib/db";
import { serializeForm } from "@/utils/serializeForm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Find form and only select the fields we need
    const form = await Form.findOne({
      formId: id,
      status: "published",
    })
      .select("formId title description theme fields")
      .lean();

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    // Serialize form data to only return essential fields
    const formData = serializeForm(form);

    return NextResponse.json(
      { message: "Form found successfully", data: formData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
