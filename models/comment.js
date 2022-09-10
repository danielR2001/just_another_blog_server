import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const Comment = model(
  "Comment",
  Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
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
