import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const getUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await User.findById({ id });
    res.status(200).json(posts);
  } catch (error) {
    next({
      code: 400,
      message: "Something went wrong while checking authorization",
      error: err,
    });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next({
        code: 404,
        message: "User doesnt exist.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return next({
        code: 404,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.SECRET,
      { expiresIn: "4 weeks" }
    );
    delete existingUser._doc.password;
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    next({
      code: 404,
      message: "Something went wrong while checking authorization",
      error: error,
    });
  }
};

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({
      code: 400,
      message: errors.array(),
    });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        code: 404,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    next({
      code: 404,
      message: "Something went wrong while checking authorization",
      error: error,
    });
  }
};
