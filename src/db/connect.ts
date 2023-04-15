import mongoose from "mongoose";
const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/booksdb");
  console.log("Succesfully connected");
};
export { connect };
