import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/schema/formSchema";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateFormPages } from "@/utils/revalidation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { status, formData } = body;
  const parsedBody = FormSchema.safeParse(formData);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error });
  }
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }
  try {
    await connectDB();
    const { fields, setting } = parsedBody.data;
    const form = await Form.create({
      formId: uuidv4(),
      owner: session.user.id,
      title: setting.formName,
      description: setting.formDescription,
      theme: setting.theme,
      fields,
      status,
      views: 0,
      submissionsCount: 0,
    });
    await form.save();

    // Revalidate form page if it's published
    if (status === "published") {
      revalidateFormPages(form.formId);
    }

    return NextResponse.json({
      status: 200,
      message: "Form created",
      id: form.formId,
    });
  } catch {
    return NextResponse.json({ status: 500, message: "Something went wrong" });
  }
}
