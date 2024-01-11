import { Schema } from "mongoose";
import { Favorites } from "../../@types.js";
const favoritesSchema = new Schema<Favorites>({
  name: { type: String, unique: true },
});

export { favoritesSchema };
