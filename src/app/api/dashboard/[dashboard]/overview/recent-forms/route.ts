import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Submission from "@/models/Submission.model";
import getServerSessionUser from "@/hooks/useServerSessionUser";
import z from "zod";

const Time = z.enum(["0", "1", "2"]);
type Time = z.infer<typeof Time>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { time } = body;
    const validTime = Time.safeParse(time);
    if (!validTime.success) {
      return NextResponse.json({ error: "Invalid time" }, { status: 400 });
    }
    const userId = req.nextUrl.pathname.split("/")[3];
    const user = await getServerSessionUser();
    if (!user || user?.id !== userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    let submissions;
    await connectDB();
    if (time === "0") {
      // All Time
      submissions = await Submission.find(
        { owner: userId },
        { _id: 0, formId: 1, submittedAt: 1 }
      );
    } else if (time === "1") {
      // This Month
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      submissions = await Submission.find(
        { owner: userId, submittedAt: { $gte: thirtyDaysAgo } },
        { _id: 0, formId: 1, submittedAt: 1 }
      );
    } else if (time === "2") {
      // This Week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      submissions = await Submission.find(
        { owner: userId, submittedAt: { $gte: oneWeekAgo } },
        { _id: 0, formId: 1, submittedAt: 1 }
      );
    }

    return NextResponse.json({ submissions }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error fetching overview data" },
      { status: 500 }
    );
  }
}
