import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide the name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
)

export default mongoose?.models?.UserSchema ||
  mongoose.model("UserSchema", UserSchema)
