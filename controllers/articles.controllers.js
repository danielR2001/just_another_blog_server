import {
  Comment,
  Like,
  Article,
  ArticleSection,
  User,
} from "../models/index.js";
import mongoose from "mongoose";

export const getArticles = async (_, res, next) => {
  try {
    const articles = await Article.find()
      .select([
        "title",
        "imageUrl",
        "url",
        "summary",
        "author",
        "tags",
        "createdAt",
        "date",
        "minToRead",
      ])
      .populate([
        {
          path: "author",
          select: ["firstName", "lastName", "imageUrl"],
        },
      ])
      .sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    next({
      code: 400,
      message: "Something went wrong while getting all articles",
      error: err,
    });
  }
};

export const getArticle = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(404).json({ error: "No such article" });
    }
    const article = await Article.findById(articleId).populate([
      {
        path: "author",
        select: ["firstName", "lastName"],
      },
      "comments",
      "sections",
    ]);
    if (!article) {
      next({
        code: 404,
        message: "No such article",
      });
    }
    res.status(200).json(article);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while getting article with id: ${id}`,
      error: error,
    });
  }
};

export const createArticle = async (req, res, next) => {
  const userId = res.locals.user._id;
  const { title, imageUrl, url, summary, tags, date, minToRead } = req.body;

  try {
    const article = new Article({
      author: userId,
      createdAt: Date.now(),
      title,
      imageUrl,
      url,
      summary,
      tags,
      date,
      minToRead,
    });

    const newArticle = await Article.create(article);

    await User.findByIdAndUpdate(
      userId,
      { $push: { articles: newArticle._id } },
      { new: true }
    );
    res.status(201).json(newArticle);
  } catch (err) {
    next({
      code: 400,
      message: "Something went wrong while creating new article",
      error: err,
    });
  }
};

export const updateArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const { title, tags } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(
      articleId,
      {
        title,
        tags,
      },
      { new: true }
    );
    if (!article) {
      next({
        code: 404,
        message: "No such article",
      });
    }
    res.status(200).json(article);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while updating article with id: ${articleId}`,
      error: err,
    });
  }
};

export const deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      return next({
        code: 404,
        message: `No such article`,
      });
    }
    const sectionIds = article.sections.map((s) => s._id);
    await ArticleSection.deleteMany({
      _id: { $in: sectionIds },
    });
    const likeIds = article.likes.map((s) => s._id);
    await Like.deleteMany({
      _id: { $in: likeIds },
    });
    const commentsIds = article.comments.map((s) => s._id);
    await Comment.deleteMany({
      _id: { $in: commentsIds },
    });
    res.status(200).json(article);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while deleting article with id: ${articleId}`,
      error: err,
    });
  }
};
