import { ArticleSection, Article } from "../models/index.js";

export const createSection = async (req, res, next) => {
  const { articleId } = req.params;
  const { order, name, type, data } = req.body;

  try {
    const section = new ArticleSection({
      order,
      name,
      type,
      data,
    });

    const newSection = await ArticleSection.create(section);

    await Article.findByIdAndUpdate(
      articleId,
      { $push: { sections: newSection._id } },
      { new: true }
    );
    return res
      .status(200)
      .json(`Created new article section in article ${articleId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while creating section for article ${articleId}`,
      error: err.message,
    });
  }
};

export const updateSection = async (req, res, next) => {
  const { order, name, type, data } = req.body;

  const { articleId, sectionId } = req.params;

  try {
    const newSection = await ArticleSection.findByIdAndUpdate(sectionId, {
      order,
      name,
      type,
      // data,
    });

    return res
      .status(200)
      .json(`Updated article section ${sectionId} in article ${articleId}`);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while creating section for article ${articleId}`,
      error: err.message,
    });
  }
};

export const deleteSection = async (req, res, next) => {
  const { articleId, sectionId } = req.params;

  try {
    const deletedSection = await ArticleSection.findByIdAndDelete(sectionId);
    if (!deletedSection) {
      return next({
        code: 404,
        message: `No such article section`,
      });
    }
    await Article.findByIdAndUpdate(
      articleId,
      { $pull: { sections: deletedSection._id } },
      { new: true }
    );
    res.status(200).json(deletedSection);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while deleting article with id: ${articleId}`,
      error: err,
    });
  }
};
