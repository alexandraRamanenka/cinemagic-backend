const User = require('../models/user');
const catchAsync = require('../utiles/catchAsync');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');

module.exports.cleanUserFields = req => {
  let newUser = req.body;
  newUser.login = req.body.login || null;
  newUser.password = req.body.password || null;
  newUser.passwordConfirmation = req.body.passwordConfirmation || null;
  newUser.email = req.body.email || null;
  newUser.phone = req.body.phone || null;
  newUser.role = 'user';
  return newUser;
};

const filterForRole = (user, role) => {
  switch (role) {
    case 'admin':
      return user;
    case 'user':
      return {
        login: user.login,
        email: user.email,
        phone: user.phone,
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
  'userId',
  filterForRole
);

module.exports.deleteUser = handlersFactory.deleteOne(User, 'userId');
module.exports.updateUser = handlersFactory.updateOne(User, 'userId');
module.exports.getCurrentUser = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Please, log in or sign up', 401));
  }

  const user = await User.findById(req.user.id.toString());
  if (!user) {
    return next(new AppError('User is no longer exists', 404));
  }

  res.status(200).json({
    status: 'succcess',
    data: user
  });
});

module.exports.updateMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Please, log in or sign up', 401));
  }

  const avatar = req.file;
  let userFields = req.body;
  if (avatar) {
    userFields.avatar = avatar.path.replace(/\\/g, "/");
  }
  userFields = filterForRole(req.body, 'user');
  const user = await User.findOneAndUpdate({ _id: req.user._id }, userFields, {
    new: true
  });

  if (!user) {
    return next(
      new AppError(`Document with id ${req.user._id} not found`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});
