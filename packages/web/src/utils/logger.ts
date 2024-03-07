import log from "loglevel";

const initialize = () => {
  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case "mock":
    case "swagger":
    case "stage":
    case "dev":
      return log.setLevel(log.levels.TRACE);
    case "prod":
    default:
      return log.setLevel(log.levels.SILENT);
  }
};

initialize();

export default log;
