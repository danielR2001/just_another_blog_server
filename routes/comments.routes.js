import express from "express";
import { createComment } from "../controllers/index.js";
import { auth } from "../middleware/index.js";
import { commentValidationRules, validator } from "../validators/index.js";

const router = express.Router();

router.post(
  "/:articleId",
  auth,
  commentValidationRules("createComment"),
  validator,
  createComment
);

export default router;
