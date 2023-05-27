import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: String,
  email: String,
  companyName: String,
  contactNo: String,
  contactNoOptional: String,
  companySize: String,
  companyRevenue: String,
  sendEmails: Boolean,
  privacyPolicy: Boolean,
  interest: String,
});

export const User = model("User", userSchema);