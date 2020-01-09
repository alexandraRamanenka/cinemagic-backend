const Session = require('../models/session');
const Film = require('../models/film');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const handlersFactory = require('./handlersFactory');

module.exports.findAllSessions = handlersFactory.getAll(Session);
module.exports.getSessionById = handlersFactory.getOne(Session, 'sessionId');
module.exports.createSession = handlersFactory.createOne(Session);
module.exports.updateSession = handlersFactory.updateOne(Session, 'sessionId');
module.exports.deleteSession = handlersFactory.deleteOne(Session, 'sessionId');
module.exports.validateSession = catchAsync(async (req, res, next) => {
  let filmId, session, dateTime, hallId;
  if (req.method === 'POST') {
    filmId = req.body.film;
    dateTime = new Date(req.body.dateTime);
    hallId = req.body.hall;
  }
  if (req.method === 'PATCH') {
    session = await Session.findById(req.params.sessionId);
    filmId = session.film;
    dateTime = session.dateTime;
    hallId = session.hall;
  }

  if (!(await checkFilmAvailability(filmId, dateTime))) {
    return next(
      new AppError('Invalid date or film is unavailable for this date', 400)
    );
  }

  if (!(await checkHallAvailability(hallId, dateTime, req.params.sessionId))) {
    return next(new AppError('Hall is unavailable for this date', 400));
  }
  next();
});

async function checkFilmAvailability(filmId, date) {
  const film = await Film.findById(filmId);
  if (!film) {
    return false;
  }
  const dateTime = new Date(date);
  if (
    film.hireStartDate > dateTime ||
    dateTime > film.hireEndDate ||
    dateTime < Date.now()
  ) {
    return false;
  }
  return true;
}

async function checkHallAvailability(hallId, dateTime, sessionId) {
  const sessions = await Session.find({
    hall: hallId,
    dateTime: {
      $gte: dateTime
    }
  });

  for (let session of sessions) {
    const endTime = new Date(
      session.dateTime.getTime() + session.film.duration * 60 * 1000
    );
    if (
      dateTime <= endTime &&
      dateTime >= session.dateTime &&
      session._id.toString() !== sessionId
    ) {
      console.log({ session, dateTime, endTime });
      return false;
    }
  }
  return true;
}

module.exports.getTodaySessions = catchAsync(async (req, res, next) => {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(tommorow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const sessions = await Session.find({
    dateTime: {
      $lte: tommorow,
      $gte: yesterday
    }
  });

  return res.status(200).json({
    status: 'success',
    data: sessions
  });
});

module.exports.getFutureSessions = catchAsync(async (req, res, next) => {
  const today = new Date();

  const sessions = await Session.find({
    dateTime: {
      $gte: today
    }
  });

  return res.status(200).json({
    status: 'success',
    data: sessions
  });
});

module.exports.deleteSessionsWithoutHalls = async hallsIds => {
  await Session.deleteMany({ hall: { $nin: hallsIds } });
};
