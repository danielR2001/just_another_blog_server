import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const Like = model(
  "Like",
  Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
    },
  })
);
