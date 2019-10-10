const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const mongoose = require('mongoose');
const Hall = require('../models/hall');
const Session = require('../models/session');
const handlersFactory = require('./handlersFactory');

module.exports.getSchedule = catchAsync(async (req, res, next) => {
  if (req.params.filmId) {
    req.query.film = req.params.filmId;
    next();
  }
  if (req.params.cinemaId) {
    const halls = await Hall.find({ cinema: req.params.cinemaId }, '_id');
    const sessions = await Session.find({ hall: { $in: halls } });

    res.status(200).json({
      status: 'success',
      data: sessions
    });
  }
  next();
});
