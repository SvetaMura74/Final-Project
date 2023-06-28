var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BookModel } from "../db/models/books.model.js";
const bookExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let found = yield BookModel.findOne({ book_id: req.body.book_id });
        if (found) {
            return res.status(400).json({ message: "Book exists already" });
        }
        found = yield BookModel.findOne({ name: req.body.name });
        if (found) {
            return res.status(400).json({ message: "Book Name exists already" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
    next();
});
export { bookExists };
