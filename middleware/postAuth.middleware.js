import { Post } from "../models/index.js";
import mongoose from "mongoose";
const { Types } = mongoose;

const postAuth = async (req, res, next) => {
  const user = res.locals.user;
  const postId = req.params["postId"];
  try {
    if (!Types.ObjectId.isValid(postId)) {
      return next({
        code: 404,
        message: "Invalid parameter id",
      });
    }

    const post = Post.find({ author: user._id, _id: postId });
    if (!post) {
      return next({
        code: 401,
        message: "Not authorized",
        error: err,
      });
    }
    res.locals.post = post;
    next();
  } catch (error) {
    err.code = 400;
    err.message = "Something went wrong while checking authorization";
    next(error);
  }
};

export default postAuth;
