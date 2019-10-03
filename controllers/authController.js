const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const AppError = require("../utiles/appError");
const cleanUserFields = require("./usersController").cleanUserFields;
const jwt = require("jsonwebtoken");
const fs = require("fs");

const getToken = user => {
  const secret = fs.readFileSync("jwtRS256.key");
  const token = jwt.sign({ user }, secret, {
    algorithm: "RS256",
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const userFields = cleanUserFields(req);
  const newUser = await User.create(userFields);

  const token = getToken({ id: newUser._id });
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
});
