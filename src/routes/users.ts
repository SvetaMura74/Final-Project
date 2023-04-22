import { Router } from "express";
import { UserModel } from "../db/models/users.model.js";

const router = Router();

/* router.post("/", (req, res) => {
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  user
    .save()
    .then((saved) => {
      res.json({ message: "User Successfully saved"});
    })
    .catch((e) => {
      res.status(500).json({ message: `Error: ${e}` });
    });
}); */

router.post("/", async (req, res) => {
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  try {
    const result = await newUser.save();
    res.json({ message: "User is Saved", id: result.id });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

/* router.get("/", (req, res) => {
  UserModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.status(500).json({ message: `Error: ${e}` });
    });
}); */

router.get("/", async (req, res) => {
 
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Error", error: e });
  }
});

//router.delete()
export {router as usersRouter};