import { Schema } from "mongoose";
const bookSchema = new Schema({
    book_id: String,
    position: String,
    name: String,
    cover: String,
    rating: Number,
    url: String,
});
export { bookSchema };
