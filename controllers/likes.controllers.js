import { Like, Article, User } from "../models/index.js";

export const likeUnlike = async (req, res, next) => {
  const { articleId } = req.params;
  const userId = res.locals.user._id;
  const newLike = new Like({
    user: userId,
    article: articleId,
  });

  try {
    const existingLike = await Like.findOne({
      user: userId,
      article: articleId,
    });

    if (existingLike) {
      const deletedLike = await Like.findByIdAndDelete(existingLike._id);
      await Article.findByIdAndUpdate(
        articleId,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      );
      return res.status(200).json(`Unliked article ${articleId}`);
    }

    const createdLike = await Like.create(newLike);
    await Article.findByIdAndUpdate(
      articleId,
      { $push: { likes: createdLike._id } },
      { new: true, useFindAndModify: false }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { likes: createdLike._id } },
      { new: true }
    );
    return res.status(200).json(`Liked article ${articleId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while liking article ${articleId}`,
      error: err.message,
    });
  }
};
