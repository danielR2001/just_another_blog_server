import express from "express";
import { likeUnlike } from "../controllers/likes.controllers.js";
import auth from "../middleware/auth.middleware.js";
import postAuth from "../middleware/postAuth.middleware.js";

const router = express.Router();

router.post("/:postId", auth, postAuth, likeUnlike);

export default router;
