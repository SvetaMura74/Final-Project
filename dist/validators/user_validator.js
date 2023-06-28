import joi from "joi";
import { passwordRegex } from "./utils.js";
const userSignupSchema = joi.object({
    firstName: joi.string().min(3).max(30).required(),
    lastName: joi.string().min(3).max(30).required(),
    userName: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(passwordRegex).required(),
});
const userSigninSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().regex(passwordRegex).required(),
});
export { userSignupSchema, userSigninSchema };
