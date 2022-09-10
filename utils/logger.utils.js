const Level = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logger = (level, title, message, error) => {
  switch (level) {
    case 0:
      console.error(
        `-------------------- ${title} --------------------\n[MESSAGE]: ${message}\n[ERROR]: ${error}`
      );
      break;
    case 1:
      console.warn(
        `-------------------- ${title} --------------------\n${message}`
      );
      break;
    case 2:
      console.info(
        `-------------------- ${title} --------------------\n${message}`
      );
      break;
    case 3:
      if (process.env.ENV == "dev") {
        console.debug(
          `-------------------- ${title} --------------------\n${message}`
        );
      }
      break;
    default:
      console.log(
        `-------------------- ${title} --------------------\n${message}`
      );
      break;
  }
};

export { logger, Level };
