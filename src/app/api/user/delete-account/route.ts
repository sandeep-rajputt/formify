import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User.model";
import { Form } from "@/models/Form.model";
import { Submission } from "@/models/Submission.model";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Find the user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete all submissions for forms owned by this user
    await Submission.deleteMany({ owner: user.dashboard });

    // Delete all forms created by this user
    await Form.deleteMany({ owner: user._id });

    // Delete the user account
    await User.findByIdAndDelete(user._id);

    return NextResponse.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
