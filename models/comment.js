import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const Comment = model(
  "Comment",
  Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Types.ObjectId,
      ref: "Article",
    },
    text: { type: String, required: true },
  })
);

const commentValidation = {
  text: {
    notEmpty: true,
    errorMessage: "text field cannot be empty",
  },
};

export { Comment, commentValidation };
