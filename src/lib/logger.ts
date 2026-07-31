import winston from "winston";

const customTimestamp = winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss",
});

const consoleFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${level}: ${timestamp} : ${stack || message}`;
  },
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    customTimestamp,
    winston.format.errors({ stack: true }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        customTimestamp,
        winston.format.colorize(),
        consoleFormat,
      ),
    }),
  ],
});

declare global {
  // eslint-disable-next-line no-var
  var __LOGGER_HANDLERS_ATTACHED__: boolean | undefined;
}

if (!global.__LOGGER_HANDLERS_ATTACHED__) {
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception", err);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection", { reason });
  });

  global.__LOGGER_HANDLERS_ATTACHED__ = true;
}
