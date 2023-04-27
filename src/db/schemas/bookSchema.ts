import { Schema} from "mongoose";

const bookSchema = new Schema({
  book_id: String,
  position: String,
  name: String,
  author:String,
  cover: String,
  rating: Number,
  description: String,
  genres:String
});
export {bookSchema};
