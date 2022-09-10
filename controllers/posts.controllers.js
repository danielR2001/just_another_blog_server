import { Comment, Like, Post, PostSection, User } from "../models/index.js";
import mongoose from "mongoose";

export const getPosts = async (_, res, next) => {
  try {
    const posts = await Post.find()
      .select("title author tags createdAt")
      .populate([
        {
          path: "author",
          select: ["firstName", "lastName"],
        },
      ])
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next({
      code: 400,
      message: "Something went wrong while getting all posts",
      error: err,
    });
  }
};

export const getPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: "No such post" });
    }
    const post = await Post.findById(postId).populate([
      {
        path: "author",
        select: ["firstName", "lastName"],
      },
      "comments",
      "sections",
    ]);
    if (!post) {
      next({
        code: 404,
        message: "No such post",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while getting post with id: ${id}`,
      error: error,
    });
  }
};

export const createPost = async (req, res, next) => {
  const userId = res.locals.user._id;
  const { title, tags } = req.body;

  try {
    const post = new Post({
      author: userId,
      createdAt: Date.now(),
      title,
      tags,
    });

    const newPost = await Post.create(post);

    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: newPost._id } },
      { new: true }
    );
    res.status(201).json(newPost);
  } catch (err) {
    next({
      code: 400,
      message: "Something went wrong while creating new post",
      error: err,
    });
  }
};

export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { title, tags } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        tags,
      },
      { new: true }
    );
    if (!post) {
      next({
        code: 404,
        message: "No such post",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while updating post with id: ${postId}`,
      error: err,
    });
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return next({
        code: 404,
        message: `No such post`,
      });
    }
    const sectionIds = post.sections.map((s) => s._id);
    await PostSection.deleteMany({
      _id: { $in: sectionIds },
    });
    const likeIds = post.likes.map((s) => s._id);
    await Like.deleteMany({
      _id: { $in: likeIds },
    });
    const commentsIds = post.comments.map((s) => s._id);
    await Comment.deleteMany({
      _id: { $in: commentsIds },
    });
    res.status(200).json(post);
  } catch (err) {
    next({
      code: 400,
      message: `Something went wrong while deleting post with id: ${postId}`,
      error: err,
    });
  }
};
