import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import { RoleModel } from "./models/roles.model.js";
import { BookModel } from "./models/books.model.js";
import { bookList } from "../mock-data/book_list.js";
const { HOST, DB, PORT, ROLES } = dbConfig;
const connect = async () => {
  //mongoose 7 update:
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  console.log(`Succesfully connected to the database ${DB}`);

  initDB();
};
const initDB = async () => {
  try {
    const count = await RoleModel.estimatedDocumentCount();
    if (count === 0) {
      const roles = ROLES.map((r) => new RoleModel({ name: r }));
      for (let role of roles) {
        await role.save();
        console.log("added ", role.name, "to Roles collection");
      }
    }
 
  } catch (e) {
    console.log("Failed with error: ", e);
  }
};
export { connect };
