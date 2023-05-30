import { Schema } from "mongoose";

const bookSchema = new Schema({
  book_id: { type: String, unique: true },
  position: String,
  name: { type: String, unique: true },
  author: String,
  cover: String,
  rating: Number,
  description: String,
  genres: String,
});
export { bookSchema };
