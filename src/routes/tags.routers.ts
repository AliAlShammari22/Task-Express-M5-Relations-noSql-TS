import express from "express";
import {
  createTag,
  getAllTags,
  addTagToPost,
} from "../conrollers/tags.controller";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTag);
router.put("/:tagId/:postId", addTagToPost);

export default router;
