import { check } from "express-validator";
import { PostSectionType } from "../models/index.js";

export const postSectionValidationRules = (method) => {
  switch (method) {
    case "createSection": {
      return [
        check("order", "Order cant be empty and must be a number.")
          .notEmpty()
          .isNumeric(),
        check("name", "Name cant be empty.").notEmpty(),
        check(
          "type",
          `Type cant be empty and must be on of these: ${Object.values(
            PostSectionType
          )}.`
        ).isIn(Object.values(PostSectionType)),
        check("data", "Data cant be empty.").notEmpty(),
      ];
    }
    case "updateSection": {
      return [
        check("order", "Order must be a number.")
          .optional()
          .isNumeric(),
        check("name").optional(),
        check(
          "type",
          `Type must be on of these: ${Object.values(
            PostSectionType
          )}.`
        )
          .optional()
          .isIn(Object.values(PostSectionType)),
        check("data").optional(),
      ];
    }
  }
};
