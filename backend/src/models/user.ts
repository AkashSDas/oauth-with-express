import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  profilePicURL: String,
  googleAuthId: String,
});

export const User = model("User", userSchema);
