import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const Like = model(
  "Like",
  Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
    },
  })
);
