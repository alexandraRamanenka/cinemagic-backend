const Session = require("../models/session");
const Film = require("../models/film");
const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");
const handlersFactory = require("./handlersFactory");

module.exports.findAllSessions = handlersFactory.getAll(Session);
module.exports.getSessionById = handlersFactory.getOne(Session, "sessionId");
module.exports.createSession = handlersFactory.createOne(Session);
module.exports.updateSession = handlersFactory.updateOne(Session, "sessionId");
module.exports.deleteSession = handlersFactory.deleteOne(Session, "sessionId");
module.exports.validateSession = catchAsync(async (req, res, next) => {
  const film = await Film.findById(req.body.film);
  if (!film) {
    return next(new AppError("Film is not found", 404));
  }
  const dateTime = new Date(req.body.dateTime);
  if (
    film.hireStartDate > dateTime ||
    dateTime > film.hireEndDate ||
    dateTime < Date.now()
  ) {
    return next(
      new AppError("Invalid date or film is unavailable for this date", 400)
    );
  }
  const sessions = await Session.find({
    hall: req.body.hall,
    dateTime: {
      $gte: dateTime
    }
  });

  for (let session of sessions) {
    const endTime = new Date(
      dateTime.getTime() + session.film.duration * 60 * 1000
    );
    if (session.dateTime <= endTime) {
      return next(new AppError("Hall is unavailable for this date", 400));
    }
  }

  next();
});
