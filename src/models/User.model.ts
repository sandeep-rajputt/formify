import mongoose, { Document, Schema } from "mongoose";

type UserRole = "user" | "admin" | "owner";

interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  role: UserRole;
}

const userSchema: Schema<IUser> = new Schema({
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
