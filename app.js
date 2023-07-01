const express = require("express");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const handlers = require("./routes");
const middlewares = require("./utils/middleware");

const app = express();

app.use(morgan("combined"));
// Allow Cross-Origin requests
app.use(cors({ methods: ["GET", "POST"] }));

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "5mb",
  })
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", handlers);
// handle undefined Routes

app.use("*", middlewares.urlNotFound);

// error handling
app.use(middlewares.logErrorHandler);
app.use(middlewares.custmErrorHandler);
app.use(middlewares.valErrorHandler);
// this should be last exception errors
app.use(middlewares.errorHandler);
module.exports = app;
