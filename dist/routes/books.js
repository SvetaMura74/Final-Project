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
import { BookModel } from "../db/models/books.model.js";
import _ from "underscore";
import { validateBookDetails } from "../middleware/verifyBookDetails.js";
import { bookExists } from "../middleware/bookExists.js";
const router = Router();
router.post("/", validateBookDetails, bookExists, 
/*  validateToken, */
/* isAdmin, */
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "book_id", "position", "name", "author", "cover", "rating", "description", "genres");
    const book = new BookModel(body);
    try {
        yield book.save();
        return res.json({ message: "Book Successfully saved", id: book._id });
    }
    catch (e) {
        return res.status(500).json({ message: `Error: ${e}` });
    }
}));
router.get("/", (req, res) => {
    BookModel.find()
        .then((result) => {
        res.json(result);
    })
        .catch((e) => {
        res.status(500).json({ message: `Error: ${e}` });
    });
});
// router.delete('/books', (req, res)=>{})
export { router as booksRouter };
