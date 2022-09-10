import { check } from "express-validator";

export const postValidationRules = (method) => {
  switch (method) {
    case "createPost": {
      return [
        check("title", "Title cant be empty.").notEmpty(),
        check("tags", "Tags cant be empty.").notEmpty(),
      ];
    }
    case "updatePost": {
      return [
        check("title").optional().notEmpty(),
        check("tags").optional().notEmpty(),
      ];
    }
  }
};
