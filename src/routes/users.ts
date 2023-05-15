import { Router } from "express";
import { UserModel } from "../db/models/users.model.js";
import _ from "underscore";
import { validateSignUp } from "../middleware/verifySignupBody.js";

const router = Router();

router.post("/signup", validateSignUp, async (req, res) => {
  try {
    const body = _.pick(req.body, "firstName", "lastName", "email", "password");
    const user = await new UserModel(body).save();
    return res.json({ message: "User is Saved", id: user._id });
  } catch (e) {
    return res.status(
      500).json({ message: " Server DB Error", error: e });
  }
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
