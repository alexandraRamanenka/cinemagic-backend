const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const handlersFactory = require("./handlersFactory");

module.exports.cleanUserFields = req => {
  let newUser = req.body;
  newUser.login = req.body.login || null;
  newUser.password = req.body.password || null;
  newUser.passwordConfirmation = req.body.passwordConfirmation || null;
  newUser.email = req.body.email || null;
  newUser.phone = req.body.phone || null;
  newUser.role = "user";
  return newUser;
};
module.exports.createUser = handlersFactory.createOne(User);

module.exports.findAllUsers = handlersFactory.getAll(User);
