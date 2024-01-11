import { model } from "mongoose";
import { favoritesSchema } from "../schemas/favoritesShema.js";
const FavoritesModel = model("Favorites", favoritesSchema);
export { FavoritesModel };
