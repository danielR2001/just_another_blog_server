import express from "express";
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/index.js";
import { auth, articleAuth } from "../middleware/index.js";
import {
  articleSectionValidationRules,
  validator,
} from "../validators/index.js";

const router = express.Router();

router.post(
  "/:articleId",
  auth,
  articleAuth,
  articleSectionValidationRules("createSection"),
  validator,
  createSection
);

router.put(
  "/:articleId/:sectionId",
  auth,
  articleAuth,
  articleSectionValidationRules("updateSection"),
  validator,
  updateSection
);

router.delete("/:articleId/:sectionId", auth, articleAuth, deleteSection);

export default router;
