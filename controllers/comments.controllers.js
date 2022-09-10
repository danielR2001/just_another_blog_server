import { Comment, Post, User } from "../models/index.js";

export const createComment = async (req, res, next) => {
  const { postId } = req.params;
  const userId = res.locals.user._id;
  const { text } = req.body;
  try {
    const newComment = new Comment({
      user: userId,
      post: postId,
      text,
    });

    const createdComment = await Comment.create(newComment);
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: createdComment._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { comments: createdComment._id } },
      { new: true }
    );
    return res.status(200).json(`Created comment for post ${postId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while commenting post ${postId}`,
      error: err.message,
    });
  }
};
