import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const PostSectionType = {
  paragraph: "P",
  image: "IMG",
  link: "A",
};

export const PostSection = model(
  "PostSection",
  Schema({
    order: { type: Number, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(PostSectionType),
      required: true,
    },
    data: { type: String, required: true },
  })
);

export const postSectionValidation = {
  order: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "order field cannot be empty",
  },
  name: {
    notEmpty: true,
    errorMessage: "name field cannot be empty",
  },
  type: {
    isIn: {
      options: [Object.values(PostSectionType)],
      errorMessage: "type is an PostSectionType enum",
    },
    errorMessage: "type field cannot be empty",
  },
  data: {
    notEmpty: true,
    errorMessage: "data field cannot be empty",
  },
};
