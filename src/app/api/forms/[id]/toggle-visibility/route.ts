import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const form = await Form.findOne({ formId: id });
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    if (form.status === "published") {
      form.status = "draft";
    } else {
      form.status = "published";
    }
    await form.save();

    return NextResponse.json(
      { message: "Visibility change Sucessfull", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error, status: 500 }, { status: 500 });
  }
}
