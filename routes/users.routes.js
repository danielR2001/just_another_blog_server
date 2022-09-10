import express from "express";
import { getUser, signIn, signUp } from "../controllers/index.js";
import { auth } from "../middleware/index.js";
import { userValidationRules, validator } from "../validators/index.js";

const router = express.Router();

router.post("/signIn", signIn);

router.post("/signUp", userValidationRules("signUp"), validator, signUp);

router.get("/:id", auth, getUser);

export default router;
