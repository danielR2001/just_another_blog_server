export { commentValidationRules } from "./comments.validators.js";
export { articleSectionValidationRules } from "./articleSections.validators.js";
export { articleValidationRules } from "./articles.validators.js";
export { userValidationRules } from "./users.validators.js";

import { validationResult } from "express-validator";

export const validator = (req, _, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({
      code: 400,
      message: errors.array(),
    });
  }
  next();
};
