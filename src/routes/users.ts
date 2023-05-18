import { Router } from "express";
import { UserModel } from "../db/models/users.model.js";
import _ from "underscore";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { userExists } from "../middleware/userExistsAlready.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySigninBody.js";

const router = Router();

router.post("/signup", validateSignUp, userExists, async (req, res) => {
  const body = _.pick(
    req.body,
    "firstName",
    "lastName",
    "userName",
    "email",
    "password"
  );
  body.password = await bcrypt.hash(body.password, 12);
  try {
    const user = await new UserModel(body).save();
    return res.json({ message: "User is Saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ message: " Server DB Error", error: e });
  }
});

router.post("/signin", validateSignIn, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "No Such User" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    return res.status(200).json({ message: "Sign In Successfull" });
  } catch (e) {}
});

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

//router.delete()
export { router as usersRouter };
