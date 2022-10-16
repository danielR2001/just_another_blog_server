import express from "express";
import {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/index.js";
import { auth, articleAuth } from "../middleware/index.js";
import { articleValidationRules, validator } from "../validators/index.js";

const router = express.Router();

router.get("/", getArticles);

router.get("/:articleId", getArticle);

router.post(
  "/",
  auth,
  articleValidationRules("createArticle"),
  validator,
  createArticle
);

router.put(
  "/:articleId",
  auth,
  articleAuth,
  articleValidationRules("updateArticle"),
  validator,
  updateArticle
);

router.delete("/:articleId", auth, articleAuth, deleteArticle);

export default router;
