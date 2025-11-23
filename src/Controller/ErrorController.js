const AppError = require("../utils/AppError");
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsErrorDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value / ${value} / please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = (err) => {
  new AppError("invalid token.please log in again!", 401);
};
const JsonExpiredError = (err) => {
  new AppError("your token has expiredv!please log in again", 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error💥", err);
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    else if (error.code === 11000) error = handleDuplicateFieldsErrorDB(error);
    else if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    else if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    else if (error.name === "JsonExpiredError") error = JsonExpiredError(error);
    sendErrorProd(error, res);
  }
};
