const winston = require("winston");

const jsonLogFileFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.logstash()
);

const logger = winston.createLogger({
  format:
    process.env.NODE_ENV === "dev"
      ? winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.prettyPrint()
        )
      : jsonLogFileFormat,
  transports: [
    ...(process.env.NODE_ENV === "dev"
      ? [new winston.transports.Console()]
      : []),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

module.exports = logger;
