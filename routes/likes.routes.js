import express from "express";
import { likeUnlike } from "../controllers/likes.controllers.js";
import auth from "../middleware/auth.middleware.js";
import articleAuth from "../middleware/articleAuth.middleware.js";

const router = express.Router();

router.post("/:articleId", auth, articleAuth, likeUnlike);

export default router;
