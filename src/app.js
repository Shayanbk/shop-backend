const express = require("express");
const UserRoutes = require("../src/utils/userRoutes");
const app = express();
app.use(express.json());
app.use("/api/v1/users", UserRoutes);
module.exports = app;
