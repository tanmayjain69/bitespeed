const logger = require("./logger");
const { httpResponse } = require("./utils");
const AppError = require("./appError");

/** error handling middlewares */
exports.errorHandler = (err, req, res) => {
  const message = "Oops Something went wrong";
  const response = httpResponse(res, [], message, 5);
  return res.json(response);
};

exports.valErrorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    const message = "Invalid inputs";
    const response = httpResponse(res, [], message, 4);
    return res.json(response);
  }
  return next(err);
};

exports.logErrorHandler = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

exports.urlNotFound = (req, res, next) => {
  const err = new AppError(4, "Url not found");
  logger.error(err);
  next(err, req, res, next);
};

exports.custmErrorHandler = (err, req, res, next) => {
  if (err.isCustom) {
    const { message, code, data } = err;
    const response = httpResponse(res, data, message, code);
    return res.json(response);
  }
  next(err);
};

/** async wrapper */
exports.asyncWrapper = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);
