import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation:{
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'users']
    },
    organization_ref: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, mobile: 1, role: 1 }, { unique: true });
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});
export const User = mongoose.model("User", userSchema);
