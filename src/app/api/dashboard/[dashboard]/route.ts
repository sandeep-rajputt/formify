import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "@/models/User.model";
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const dashboardId = req.nextUrl.pathname.split("/")[3];

    const user: IUser | null = await User.findOne({ dashboard: dashboardId });

    if (!user) {
      return NextResponse.json(
        { message: "Dashboard not found." },
        { status: 404 }
      );
    }

    if (user.dashboard !== dashboardId) {
      return NextResponse.json(
        { message: "You are not authorized to access this dashboard." },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { message: "success", name: user.name },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
