import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form.model";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateFormPages } from "@/utils/revalidation";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: formId } = await params;
    const body = await req.json();

    // Find the form and check ownership
    const form = await Form.findOne({
      formId,
      owner: session.user.id,
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    // Store old status to check if it changed
    const oldStatus = form.status;

    // Update the form
    const updatedForm = await Form.findOneAndUpdate(
      { formId, owner: session.user.id },
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedForm) {
      return NextResponse.json(
        { message: "Failed to update form" },
        { status: 500 }
      );
    }

    // Revalidate if form was published or status changed
    if (
      updatedForm.status === "published" ||
      oldStatus !== updatedForm.status
    ) {
      revalidateFormPages(formId);
    }

    return NextResponse.json({
      message: "Form updated successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
