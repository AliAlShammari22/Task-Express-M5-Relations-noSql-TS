import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const Post = model("Post", postSchema);

export default Post;
