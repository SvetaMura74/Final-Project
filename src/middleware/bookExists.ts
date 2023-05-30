import { RequestHandler } from "express";
import { BookModel } from "../db/models/books.model.js";

const bookExists: RequestHandler = async (req, res, next) => {
  try {
    let found = await BookModel.findOne({ book_id: req.body.book_id });
    if (found) {
      return res.status(400).json({ message: "Book exists already" });
    }
    found = await BookModel.findOne({ name: req.body.name });
    if (found) {
      return res.status(400).json({ message: "Book Name exists already" });
    }
   
  } catch (e) {
    return res.status(500).json({ message: e });
  }
   next();
};
export { bookExists };
