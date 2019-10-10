const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const mongoose = require('mongoose');
const Hall = require('../models/hall');
const Session = require('../models/session');
const handlersFactory = require('./handlersFactory');

module.exports.getCinemaSchedule = catchAsync(async (req, res, next) => {
  if (req.params.cinemaId) {
    const halls = await Hall.find({ cinema: req.params.cinemaId });
    const sessions = await Session.find({ hall: { $in: halls } });

    return res.status(200).json({
      status: 'success',
      data: sessions
    });
  }
  return next();
});

module.exports.setFilmFilter = (req, res, next) => {
  if (req.params.filmId) {
    req.query.film = req.params.filmId;
  }
  return next();
};
