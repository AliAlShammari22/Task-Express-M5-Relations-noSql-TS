import Author from "../models/Author";
import { NextFunction, Request, Response } from "express";
import Tag from "../models/Tag";

const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newtag = await Tag.create({ name });
    res.status(201).json(newtag);
  } catch (error) {
    next(error);
  }
};

export { getAllTags, createTag };
