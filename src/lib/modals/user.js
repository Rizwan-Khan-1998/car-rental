import { Schema, models, model } from "mongoose";
export const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
export const User = models.User || model("User", UserSchema);
