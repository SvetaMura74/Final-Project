import { RequestHandler } from "express";
import _ from "underscore";
import { userSignupSchema } from "../validators/user_validator.js";

const validateSignUp: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "firstName","lastName" ,"email", "password");
  const { error } = userSignupSchema.validate(body);
  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((ed) => ed.message),
    });
  }
  next();
};
export { validateSignUp };
