import { RequestHandler } from "express";
import { UserModel } from "../db/models/users.model.js";
import { RoleModel } from "../db/models/roles.model.js";

const isAdmin: RequestHandler = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId);
    const roles = await RoleModel.find({ _id: { $in: user.roles } });
    for (let role of roles) {
      if (role.name === "admin") {
        return next();
      }
    }
    return res.status(403).json({ message: "Requires Admin Role" });
  } catch (e) {
    return res.status(500).json({ message: "Requires Admin Role", error: e });
  }
};
export { isAdmin };
