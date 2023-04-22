//modularity:
//mini express application
import { Router } from "express";
import { BookModel } from "../db/models/books.model.js";
const router = Router();
//////////////////////////
router.post("/", (req, res) => {
    const book = new BookModel({
        book_id: req.body.book_id,
        position: req.body.position,
        name: req.body.name,
        cover: req.body.cover,
        url: req.body.url,
    });
    book
        .save()
        .then((saved) => {
        res.json({ message: "Book Successfully saved" });
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
