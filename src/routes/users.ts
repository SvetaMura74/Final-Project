import { Router } from "express";
import { UserModel } from "../db/models/users.model.js";
import _ from "underscore";
import { uSchema } from "../validators/user_validator.js";

const router = Router();

router.post("/", async (req, res) => {
  const body = _.pick(req.body, "firstName","lastName","email");

  const validationResult = uSchema.validate(body);
  const err = validationResult.error;
  if (err) {
    return res.status(400).json(err.details.map((o) => o.message));
  }

  const newUser = new UserModel(body);
  try {
    const result = await newUser.save();
    res.json({ message: "User is Saved", id: result.id });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
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
