import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      uniqe: true,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superAdmin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
