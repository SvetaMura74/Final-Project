import { RequestHandler } from "express";
import _ from "underscore";
import { userSigninSchema } from "../validators/user_validator.js";

const validateSignIn: RequestHandler = (req, res, next) => {
  const body = _.pick(
    req.body,
    "email",
    "password"
  );
  const { error } = userSigninSchema.validate(body);
  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((ed) => ed.message),
    });
  }
  next();
};
export { validateSignIn };
