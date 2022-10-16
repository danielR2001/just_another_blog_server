import { Article } from "../models/index.js";
import mongoose from "mongoose";
const { Types } = mongoose;

const articleAuth = async (req, res, next) => {
  const user = res.locals.user;
  const articleId = req.params["articleId"];
  try {
    if (!Types.ObjectId.isValid(articleId)) {
      return next({
        code: 404,
        message: "Invalid parameter id",
      });
    }

    const article = Article.find({ author: user._id, _id: articleId });
    if (!article) {
      return next({
        code: 401,
        message: "Not authorized",
        error: err,
      });
    }
    res.locals.article = article;
    next();
  } catch (error) {
    err.code = 400;
    err.message = "Something went wrong while checking authorization";
    next(error);
  }
};

export default articleAuth;
