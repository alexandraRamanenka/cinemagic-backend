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

const filterForRole = (user, role) => {
  switch (role) {
    case "admin":
      return user;
    case "user":
      return {
        login: user.login,
        email: user.email,
        avatar: user.avatar
      };
    default:
      return {
        login: user.login,
        avatar: user.avatar
      };
  }
};

module.exports.createUser = handlersFactory.createOne(User);

module.exports.findAllUsers = handlersFactory.getAll(User);

module.exports.getUserById = handlersFactory.getOne(
  User,
  "userId",
  filterForRole
);

module.exports.deleteUser = handlersFactory.deleteOne(User, "userId");
