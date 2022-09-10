import { Like, Post, User } from "../models/index.js";

export const likeUnlike = async (req, res, next) => {
  const { postId } = req.params;
  const userId = res.locals.user._id;
  const newLike = new Like({
    user: userId,
    post: postId,
  });

  try {
    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      const deletedLike = await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      );
      return res.status(200).json(`Unliked post ${postId}`);
    }

    const createdLike = await Like.create(newLike);
    await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: createdLike._id } },
      { new: true, useFindAndModify: false }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { likes: createdLike._id } },
      { new: true }
    );
    return res.status(200).json(`Liked post ${postId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while liking post ${postId}`,
      error: err.message,
    });
  }
};
