const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const path = require("path");
const fs = require("fs");

// Ensure the logs directory exists
const env = process.env.NODE_ENV || "development";
const logDir = path.join(__dirname, "..", "logs", env);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.Console(),
  ],
});

console.log("Logger initialized"); // Added for verification

module.exports = logger;
