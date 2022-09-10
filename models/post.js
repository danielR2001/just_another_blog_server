import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const Post = model(
  "Post",
  Schema({
    title: { type: String, required: true },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    sections: [
      {
        type: Types.ObjectId,
        ref: "PostSection",
      },
    ],
    tags: { type: [String], required: true },
    likes: [
      {
        type: Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);
