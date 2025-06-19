import Author from "../models/Author";
import { NextFunction, Request, Response } from "express";

const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find()
      // i want to show only name in the tags
      .populate("posts", "title body tags")
      .select("name posts");
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newauthor = await Author.create({ name });
    res.status(201).json(newauthor);
  } catch (error) {
    next(error);
  }
};

export { getAllAuthors, createAuthor };
