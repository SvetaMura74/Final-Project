import express from "express";
import morgan from "morgan";
import { notFound } from "./middleware/not_found.js";
import { booksRouter } from "./routes/books.js";
import { connect } from "./db/connect.js";

const app = express();
connect().catch((e) => console.log(e));
app.use(express.json());
//logger
app.use(morgan("dev"));
//routes:
app.use("/api/books", booksRouter); //add /api/books before booksRouter

//404
app.use(notFound);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
