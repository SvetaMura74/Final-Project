import express from "express";
import morgan from "morgan";
import { notFound } from "./middleware/not_found.js";
import { booksRouter } from "./routes/books.js";
import { connect } from "./db/connect.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors";
const app = express();
connect().catch((e) => console.log(e));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
//logger
app.use(morgan("dev"));
//routes:
app.use("/api/books", booksRouter); //add /api/books before booksRouter
app.use("/api/auth", usersRouter);
//404
app.use(notFound);
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
