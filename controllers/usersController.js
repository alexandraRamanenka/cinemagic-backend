const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");

module.exports.createUser = catchAsync(async (req, res, next) => {
  let newUser = new User(req.body);
  await newUser.save();
  res.send("User created");
});

module.exports.findAllUsers = catchAsync(async (req, res, next) => {
  let users = await User.find({});
  res.send(users);
});
