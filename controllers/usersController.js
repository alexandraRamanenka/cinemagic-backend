const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const handlersFactory = require("./handlersFactory");

const cleanUserFields = req => {
  let newUser = req.body;
  //   newUser.login = req.body.login;
  //   newUser.password = req.body
  newUser.role = "user";
  return newUser;
};
module.exports.createUser = handlersFactory.createOne(User, cleanUserFields);

module.exports.findAllUsers = handlersFactory.getAll(User);
