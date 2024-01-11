import { Schema } from "mongoose";
const favoritesSchema = new Schema({
    name: { type: String, unique: true },
});
export { favoritesSchema };
