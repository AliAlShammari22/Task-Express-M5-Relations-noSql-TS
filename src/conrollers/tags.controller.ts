import Author from "../models/Author";
import { NextFunction, Request, Response } from "express";
import Tag from "../models/Tag";
import Post from "../models/Post";

const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.find().populate("posts", "title body");
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

const addTagToPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagId, postId } = req.params;
    //1. find the tag and add the post to the array
    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: postId },
    });
    //2. find the post and add the tag to the array
    await Post.findByIdAndUpdate(postId, {
      $push: { tags: tagId },
    });
    res.status(200).json({ message: "Tag added to post successfully" });
  } catch (error) {
    next(error);
  }
};

export { getAllTags, createTag, addTagToPost };
