const User = require('../models/user');
const catchAsync = require('../utiles/catchAsync');
const AppError = require('../utiles/appError');
const cleanUserFields = require('./usersController').cleanUserFields;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const jwtOpt = {
  algorithm: 'RS256',
  expiresIn: process.env.JWT_EXPIRES_IN
};

const getToken = user => {
  const secret = fs.readFileSync('jwtRS256.key');
  const token = jwt.sign({ id: user._id, role: user.role }, secret, jwtOpt);
  return token;
};

const sendToken = (user, statusCode, res) => {
  const token = getToken(user);
  user.password = undefined;

  const cookieOpt = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true
  };

  res.cookie('jwt', token, cookieOpt);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const userFields = cleanUserFields(req);
  const newUser = await User.create(userFields);

  sendToken(newUser, 201, res);
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { password, login } = req.body;

  console.log(req.body);
  if (!password || !login) {
    return next(new AppError('Login and password required', 401));
  }

  const user = await User.findOne({ login });
  if (!user || !user.isCorrectPassword(password)) {
    return next(new AppError('Invalid credentials', 401));
  }

  sendToken(user, 200, res);
});

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const passportOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: fs.readFileSync('jwtRS256.key.pub'),
  jsonWebTokenOptions: jwtOpt
};

passport.use(
  new Strategy(passportOpt, function(payload, done) {
    User.findOne({ _id: payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(new AppError('invalid token, log in again', 401), false);
      }
      user.password = undefined;
      return done(null, user);
    });
  })
);

module.exports.authenticate = passport.authenticate('jwt', { session: false });

module.exports.restrictTo = roles => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return next(new AppError('Permission denied', 401));
    }
    next();
  };
};
