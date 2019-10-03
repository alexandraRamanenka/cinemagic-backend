const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const AppError = require("../utiles/appError");
const cleanUserFields = require("./usersController").cleanUserFields;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const jwtOpt = {
  algorithm: "RS256",
  expiresIn: process.env.JWT_EXPIRES_IN
};

const getToken = user => {
  const secret = fs.readFileSync("jwtRS256.key");
  const token = jwt.sign({ id: user._id }, secret, jwtOpt);
  return token;
};

const sendToken = (user, statusCode, res) => {
  const token = getToken(user);
  user.password = undefined;

  const cookieOpt = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true
  };

  res.cookie("jwt", token, cookieOpt);

  res.status(statusCode).json({
    status: "success",
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

  if (!password || !login) {
    return next(new AppError("Login and password required", 401));
  }

  const user = await User.findOne({ login });
  if (!user || !user.isCorrectPassword(password)) {
    return next(new AppError("Invalid credentials", 401));
  }

  sendToken(user, 200, res);
});

const passportOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: fs.readFileSync("jwtRS256.key.pub"),
  jsonWebTokenOptions: jwtOpt
};

passport.use(
  new Strategy(passportOpt, function(payload, done) {
    User.findOne({ _id: payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      console.log(payload);
      console.log(payload.id);
      if (!user) {
        return done(new AppError("invalid token, log in again", 401), false);
      }
      user.password = undefined;
      return done(null, user);
    });
  })
);

module.exports.authenticate = passport.authenticate("jwt", { session: false });