import { PostSection, Post } from "../models/index.js";

export const createSection = async (req, res, next) => {
  const { postId } = req.params;
  const { order, name, type, data } = req.body;

  try {
    const section = new PostSection({
      order,
      name,
      type,
      data,
    });

    const newSection = await PostSection.create(section);

    await Post.findByIdAndUpdate(
      postId,
      { $push: { sections: newSection._id } },
      { new: true }
    );
    return res.status(200).json(`Created new post section in post ${postId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while creating section for post ${postId}`,
      error: err.message,
    });
  }
};

export const updateSection = async (req, res, next) => {
  const { order, name, type, data } = req.body;

  const { postId, sectionId } = req.params;

  try {
    const newSection = await PostSection.findByIdAndUpdate(sectionId, {
      order,
      name,
      type,
      // data,
    });

    return res
      .status(200)
      .json(`Updated post section ${sectionId} in post ${postId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while creating section for post ${postId}`,
      error: err.message,
    });
  }
};

export const deleteSection = async (req, res, next) => {
  const { postId, sectionId } = req.params;

  try {
    const deletedSection = await PostSection.findByIdAndDelete(sectionId);
    if (!deletedSection) {
      return next({
        code: 404,
        message: `No such post section`,
      });
    }
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { sections: deletedSection._id } },
      { new: true }
    );
    res.status(200).json(deletedSection);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while deleting post with id: ${postId}`,
      error: err,
    });
  }
};
