const express = require("express");
const usercontroller = require("../controllers/usercontroller");
const Route = express.Router();
Route.route("/singup").post(usercontroller.createUser);
module.exports = Route;
