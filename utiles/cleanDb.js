const Cinema = require('./../models/cinema');
const Hall = require('./../models/hall');
const Session = require('./../models/session');
const Reservation = require('./../models/reservation');

async function cleanDb() {
  let cinemaIds = await Cinema.find({}, '_id');
  cinemaIds = cinemaIds.map(cinema => cinema._id);
  const hallsWithoutCinema = await Hall.deleteMany({
    cinema: { $nin: cinemaIds }
  });

  let hallsIds = await Hall.find({}, '_id');
  hallsIds = hallsIds.map(hall => hall._id);
  const sessionsWithoutHalls = await Session.deleteMany({
    hall: { $nin: hallsIds }
  });

  let sessionsIds = await Session.find({}, '_id');
  sessionsIds = sessionsIds.map(session => session._id);
  const reservationsWithoutSessions = await Reservation.deleteMany({
    session: { $nin: sessionsIds }
  });

  return {
    hallsWithoutCinema,
    sessionsWithoutHalls,
    reservationsWithoutSessions
  };
}

async function clean(req, res, next) {
  const {
    hallsWithoutCinema,
    sessionsWithoutHalls,
    reservationsWithoutSessions
  } = await cleanDb();

  res.send({
    hallsWithoutCinema,
    sessionsWithoutHalls,
    reservationsWithoutSessions
  });
}

module.exports.clean = clean;
