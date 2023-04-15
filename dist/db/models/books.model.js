import { model } from "mongoose";
import { bookSchema } from "../schemas/bookSchema.js";
const BookModel = model("Books", bookSchema);
export { BookModel };
