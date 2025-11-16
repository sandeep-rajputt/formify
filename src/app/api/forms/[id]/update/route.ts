import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form.model";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateFormPages } from "@/utils/revalidation";
import z from "zod";
import { formFieldsSchema, formSettingSchema } from "@/schema/formSchema";

const BodySchema = z.object({
  formData: z.object({
    fields: z
      .array(formFieldsSchema)
      .max(50, {
        message: "Form can't have more than 50 fields",
      })
      .min(2, { message: "Your form must have at least 2 fields" }),
    setting: formSettingSchema,
  }),
  status: z.enum(["draft", "published"]),
});

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

    const data = BodySchema.parse(body);
    console.log(data);

    form.fields = data.formData.fields;
    form.title = data.formData.setting.formName;
    form.description = data.formData.setting.formDescription;
    form.theme = data.formData.setting.theme;
    form.status = data.status;

    await form.save();

    revalidateFormPages(formId);

    return NextResponse.json({
      message: "Form updated successfully",
      data: form,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
