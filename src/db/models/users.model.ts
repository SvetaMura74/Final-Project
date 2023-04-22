import { userSchema } from "../schemas/userSchema.js";
import { model } from "mongoose";
const UserModel = model("Users", userSchema);
export {UserModel}