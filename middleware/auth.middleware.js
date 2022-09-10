import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET);
      const userId = decodedData?.id;

      const user = await User.findById(userId);
      if (!user) {
        return next({
          code: 404,
          message: "User doesnt exist",
          error: err,
        });
      }
      res.locals.user = user;
      next();
    } else {
      return next({
        code: 401,
        message: "Not authorized",
        error: err,
      });
    }
  } catch (err) {
    next({
      code: 400,
      message: "Something went wrong while checking authorization",
      error: err,
    });
  }
};

export default auth;
