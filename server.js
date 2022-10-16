import express from "express";
import {
  commentRoutes,
  userRoutes,
  articleRoutes,
  likeRoutes,
  articleSectionsRoutes,
} from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { logger, Level } from "./utils/logger.utils.js";
import errorhandler from "./utils/errors/errorHandler.utils.js";

//  get env variables
dotenv.config();

//  create express app
const app = express();

//  app settings
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//  log requets
app.use((req, _, next) => {
  logger(Level.info, "REQUEST", `${req.method} ${req.path}`);
  next();
});

//  routes
app.use("/users", userRoutes);
app.use("/articles", articleRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/articleSections", articleSectionsRoutes);

//  error handler
app.use(errorhandler);

//  connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //  start server
    app.listen(process.env.PORT, () => {
      logger(
        Level.info,
        "SERVER INITIALIZED",
        `server is alive on port ${process.env.PORT}, and feeling better than ever!`
      );
    });
  })
  .catch((err) => {
    logger(Level.error, "ERROR", "some message", err);
  });
