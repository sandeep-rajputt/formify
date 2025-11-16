import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import Submission from "@/models/Submission.model";
import getServerSessionUser from "@/hooks/useServerSessionUser";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.pathname.split("/")[3];

  // match the user
  const user = await getServerSessionUser();
  if (!user || user?.id !== userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();

    // only length of forms _and status
    const forms = await Form.find({ owner: userId }, "status").lean();

    // published forms
    const publishedForms = forms.filter((form) => form.status === "published");
    const publishedCount = publishedForms.length;

    // get submissions whose owner = userId, get only createdAt
    const submissions = await Submission.find(
      { owner: userId },
      "createdAt"
    ).lean();

    // recent created forms
    const recentForms = await Form.find(
      { owner: userId },
      "title formId status submissionsCount views createdAt updatedAt description"
    )
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // forms submissions
    const formsSubmissions = await Form.find(
      { owner: userId },
      "title formId submissionsCount status views createdAt updatedAt description"
    )
      .sort({ submissionsCount: -1 })
      .limit(5)
      .lean();

    return NextResponse.json(
      {
        message: "success",
        data: {
          totalForms: forms.length,
          totalSubmissions: submissions.length,
          publishedForms: publishedCount,
          formsSubmissions,
          recentForms,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error fetching overview data" },
      { status: 500 }
    );
  }
}
