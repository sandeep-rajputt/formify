import mongoose, { Document, Schema } from "mongoose";

type UserRole = "user" | "admin" | "owner";

interface IUser extends Document {
  dashboard: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
}

const userSchema: Schema<IUser> = new Schema({
  dashboard: { type: String, required: true, unique: true },
  name: { type: String, required: true, default: "Unknown" },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true, default: "/user.svg" },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
