import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/index.js";
import { auth, postAuth } from "../middleware/index.js";
import { postValidationRules, validator } from "../validators/index.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:postId", getPost);

router.post(
  "/",
  auth,
  postValidationRules("createPost"),
  validator,
  createPost
);

router.put(
  "/:postId",
  auth,
  postAuth,
  postValidationRules("updatePost"),
  validator,
  updatePost
);

router.delete("/:postId", auth, postAuth, deletePost);

export default router;
