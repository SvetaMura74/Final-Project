var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "underscore";
import { UserModel } from "../db/models/users.model.js";
const userExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "userName", "email");
    let found = yield UserModel.findOne({ email: body.email });
    if (found) {
        return res.status(400).json({ message: "Email exsists already" });
    }
    ;
    found = yield UserModel.findOne({ userName: body.userName });
    if (found) {
        return res.status(400).json({ message: "User Name exsists already" });
    }
    next();
});
export { userExists };
