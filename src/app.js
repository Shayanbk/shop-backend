const express = require("express");
const globalErrorHandler = require("./Controller/ErrorController");
const AppError = require("./utils/AppError");
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
// برای خواندن JSON
app.use(express.json());
// Routes
app.use("/api/v1/user", UserRoutes);
// اگر هیچ روتی پیدا نشد:
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
// Global Error Handler
app.use(globalErrorHandler);
module.exports = app;