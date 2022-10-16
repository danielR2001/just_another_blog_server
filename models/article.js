import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const Article = model(
  "Article",
  Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    url: { type: String },
    tag: { type: String },
    summary: { type: String },
    date: { type: String },
    minToRead: { type: Number },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    sections: [
      {
        type: Types.ObjectId,
        ref: "ArticleSection",
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
