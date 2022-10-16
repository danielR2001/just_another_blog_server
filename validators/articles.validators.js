import { check } from "express-validator";

export const articleValidationRules = (method) => {
  switch (method) {
    case "createArticle": {
      return [
        check("title", "Title cant be empty.").notEmpty(),
        check("tags", "Tags cant be empty.").notEmpty(),
      ];
    }
    case "updateArticle": {
      return [
        check("title").optional().notEmpty(),
        check("tags").optional().notEmpty(),
      ];
    }
  }
};
