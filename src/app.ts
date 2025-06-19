import express from "express";
import connectDB from "./database";
import postsRouter from "./routes/posts.routers";
import authorsRouter from "./routes/authors.routers";
import tagsRouter from "./routes/tags.routers";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(morgan("dev"));

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
