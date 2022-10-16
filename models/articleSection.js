import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const ArticleSectionType = {
  paragraph: "P",
  image: "IMG",
  link: "A",
};

export const ArticleSection = model(
  "ArticleSection",
  Schema({
    order: { type: Number, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(ArticleSectionType),
      required: true,
    },
    data: { type: String, required: true },
  })
);

export const articleSectionValidation = {
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
      options: [Object.values(ArticleSectionType)],
      errorMessage: "type is an article section type enum",
    },
    errorMessage: "type field cannot be empty",
  },
  data: {
    notEmpty: true,
    errorMessage: "data field cannot be empty",
  },
};
