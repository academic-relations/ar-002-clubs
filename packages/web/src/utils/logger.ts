import logger from "loglevel";

const initialize = () => {
  switch (process.env.NEXT_PUBLIC_APP_MODE) {
    case "mock":
    case "swagger":
    case "stage":
    case "dev":
      return logger.setLevel(logger.levels.DEBUG);
    case "production":
    default:
      return logger.setLevel(logger.levels.SILENT);
  }
};

initialize();

export default logger;
