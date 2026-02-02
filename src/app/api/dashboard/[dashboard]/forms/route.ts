import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form.model";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ dashboard: string }> },
) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { dashboard } = await params;

    // Verify user has access to this dashboard
    if (session.user.dashboard !== dashboard) {
      return NextResponse.json(
        { message: "You are not authorized to access this dashboard." },
        { status: 403 },
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const order = searchParams.get("order") || "desc";

    // Build query
    const query: Record<string, unknown> = { owner: session.user.id };

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add status filter
    if (status !== "all") {
      query.status = status;
    }

    // Build sort object
    const sortOrder: 1 | -1 = order === "desc" ? -1 : 1;
    const sortObj = { [sortBy]: sortOrder };

    // Get all forms for this user
    const forms = await Form.find(query)
      .select(
        "formId title description submissionsCount status views createdAt updatedAt",
      )
      .sort(sortObj)
      .lean();

    return NextResponse.json({
      message: "Forms fetched successfully",
      data: forms,
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
