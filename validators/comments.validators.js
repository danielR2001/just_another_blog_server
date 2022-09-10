import { check } from "express-validator";

export const commentValidationRules = (method) => {
  switch (method) {
    case "createComment": {
      return [check("text", "Text cant be empty.").notEmpty()];
    }
  }
};
