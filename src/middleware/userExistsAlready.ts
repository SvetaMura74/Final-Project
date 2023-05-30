import { UserModel } from "../db/models/users.model.js";
import { RequestHandler } from "express";

const userExists: RequestHandler = async (req, res, next) => {
  try {
    let found = await UserModel.findOne({ userName: req.body.userName });
    if (found) {
      return res.status(400).json({ message: "User Name exists already" });
    }

   found = await UserModel.findOne({ email: req.body.email });
    if (found) {
      return res.status(400).json({ message: "Email exists already" });
    } 
   
    next();
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
export { userExists };
