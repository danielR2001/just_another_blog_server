import express from "express";
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/index.js";
import { auth, postAuth } from "../middleware/index.js";
import { postSectionValidationRules, validator } from "../validators/index.js";

const router = express.Router();

router.post(
  "/:postId",
  auth,
  postAuth,
  postSectionValidationRules("createSection"),
  validator,
  createSection
);

router.put(
  "/:postId/:sectionId",
  auth,
  postAuth,
  postSectionValidationRules("updateSection"),
  validator,
  updateSection
);

router.delete("/:postId/:sectionId", auth, postAuth, deleteSection);

export default router;
