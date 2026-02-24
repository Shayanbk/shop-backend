const express = require("express");
const usercontroller = require("../controllers/usercontroller");
const Route = express.Router();
Route.route("/singup").post(usercontroller.createUser);
Route.route("/:id").get(usercontroller.getOne);
Route.route("/").get(usercontroller.getAll);
Route.route("/:id").delete(usercontroller.deleteUser);
Route.route("/:id").patch(usercontroller.updateUser);
module.exports = Route;
