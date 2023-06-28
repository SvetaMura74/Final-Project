var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { UserModel } from "../db/models/users.model.js";
import _ from "underscore";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { userExists } from "../middleware/userExistsAlready.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySigninBody.js";
import { RoleModel } from "../db/models/roles.model.js";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
const router = Router();
router.post("/signup", validateSignUp, userExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "firstName", "lastName", "userName", "email", "password");
    body.password = yield bcrypt.hash(body.password, 12);
    const user = new UserModel(body);
    try {
        user.roles = [yield (yield RoleModel.findOne({ name: "user" }))._id];
        yield user.save();
        return res.json({ message: "User is Saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({ message: " Server DB Error", error: e });
    }
}));
router.post("/signin", validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: "30d",
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
        }
        return res.status(200).json({
            id: user.id,
            username: user.userName,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error", error: e });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel.find();
        res.json(users);
    }
    catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}));
//router.delete()
export { router as usersRouter };
