import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const User = model(
  "User",
  Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imageUrl: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    articles: [
      {
        type: Types.ObjectId,
        ref: "Article",
      },
    ],
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
  })
);

export const userValidation = {
  firstName: {
    notEmpty: true,
    errorMessage: "firstName field cannot be empty",
  },
  lastName: {
    notEmpty: true,
    errorMessage: "lastName field cannot be empty",
  },
  email: {
    isEmail: true,
    errorMessage: "email field must be a valid email",
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, ont symbol and one number",
  },
};
