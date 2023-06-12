import { Router } from "express";
import { BookModel } from "../db/models/books.model.js";
import _ from "underscore";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { validateBookDetails } from "../middleware/verifyBookDetails.js";
import { bookExists } from "../middleware/bookExists.js";

const router = Router();

router.post(
  "/",
  validateBookDetails,
  bookExists,
  validateToken,
  isAdmin,

  async (req, res) => {
    const body = _.pick(
      req.body,
      "book_id",
      "position",
      "name",
      "author",
      "cover",
      "rating",
      "description",
      "genres"
    );

    const book = new BookModel(body);
    try {
      await book.save();
      return res.json({ message: "Book Successfully saved", id: book._id });
    } catch (e) {
      return res.status(500).json({ message: `Error: ${e}` });
    }
  }
);

router.get("/",  (req, res) => {
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
