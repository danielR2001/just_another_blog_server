import { Comment, Article, User } from "../models/index.js";

export const createComment = async (req, res, next) => {
  const { articleId } = req.params;
  const userId = res.locals.user._id;
  const { text } = req.body;
  try {
    const newComment = new Comment({
      user: userId,
      article: articleId,
      text,
    });

    const createdComment = await Comment.create(newComment);
    await Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: createdComment._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { comments: createdComment._id } },
      { new: true }
    );
    return res.status(200).json(`Created comment for article ${articleId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while commenting article ${articleId}`,
      error: err.message,
    });
  }
};
