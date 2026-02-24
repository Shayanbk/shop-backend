const User = require("../models/usermodel");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "user create successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user fatched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!id) {
      res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const allowedUpdates = ["name", "email"];
    const updates = {};
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found" });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
