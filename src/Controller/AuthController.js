const User = require("../Model/UserModel");
exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.log(err); // ← خیلی مهم
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
