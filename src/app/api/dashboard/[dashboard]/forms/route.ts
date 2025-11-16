import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Form } from "@/models/Form.model";
import getServerSessionUser from "@/hooks/useServerSessionUser";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.pathname.split("/")[3];
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";

  const user = await getServerSessionUser();
  if (!user || user?.id !== userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();

    const query: Record<string, unknown> = { owner: userId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status !== "all") {
      query.status = status;
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions: Record<string, 1 | -1> = { [sortBy]: sortOrder };

    const forms = await Form.find(query)
      .select(
        "formId title description status submissionsCount views createdAt updatedAt"
      )
      .sort(sortOptions)
      .lean();

    return NextResponse.json(
      {
        message: "success",
        data: forms,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error fetching forms" },
      { status: 500 }
    );
  }
}
