const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const handlersFactory = require("./handlersFactory");

module.exports.createUser = handlersFactory.createOne(User);

module.exports.findAllUsers = handlersFactory.getAll(User);
