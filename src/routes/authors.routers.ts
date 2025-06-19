import express from "express";
import { getAllAuthors, createAuthor } from "../conrollers/authors.controller";

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);

export default router;
