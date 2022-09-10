import { Level, logger } from "../logger.utils.js";

const errorHandler = (err, _, res, __) => {
  logger(Level.error, "ERROR", err.message, err.error);
  res.status(err.code).json({ message: err.message });
};

export default errorHandler;
