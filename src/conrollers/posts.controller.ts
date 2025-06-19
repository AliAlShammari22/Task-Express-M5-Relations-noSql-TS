import { Request, Response } from "express";
import Post from "../models/Post";
import Author from "../models/Author";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .select("title body author")
      .populate("author", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, authorId } = req.body;
    const post = await Post.create({ title, body, author: authorId });
    const author = await Author.findByIdAndUpdate(authorId, {
      $push: { posts: post._id },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
