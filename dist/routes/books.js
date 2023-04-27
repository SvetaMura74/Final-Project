//modularity:
//mini express application
import { Router } from "express";
import { BookModel } from "../db/models/books.model.js";
const router = Router();
import _ from 'underscore';
import { bSchema } from "../validators/book_validator.js";
//////////////////////////
router.post("/", (req, res) => {
    const body = _.pick(req.body, "book_id", "position", "name", "author", "cover", "rating", "description", "genres");
    const validationResult = bSchema.validate(body);
    const err = validationResult.error;
    if (err) {
        return res.status(400).json(err.details.map((o) => o.message));
    }
    const book = new BookModel(body);
    book
        .save()
        .then((saved) => {
        res.json({ message: "Book Successfully saved", id: saved._id });
    })
        .catch((e) => {
        res.status(500).json({ message: `Error: ${e}` });
    });
});
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
