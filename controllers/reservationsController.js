const Reservation = require('../models/reservation');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const handlersFactory = require('./handlersFactory');

const validateSeats = catchAsync(async (req, res, next) => {
  let seats, session;
  if (req.method === 'POST') {
    seats = req.body.seats;
    session = req.body.session;
  }
  if (req.method === 'PATCH') {
    const reservation = await Reservation.findById(req.params.reservationId);
    seats = req.body.seats || reservation.seats;
    session = req.body.session || reservation.session;
  }

  if (!(await checkAllSeats(session, seats, req.params.reservationId))) {
    return next(new AppError('Seat is already reserved', 400));
  }
  next();
});

async function checkSeat(session, seat, reservationId) {
  let reservations = await Reservation.find({
    session: session
  });

  for (let reserv of reservations) {
    for (let seatRes of reserv.seats) {
      if (
        seatRes.line == seat.line &&
        seatRes.seatNumber == seat.seatNumber &&
        reserv._id.toString() !== reservationId
      ) {
        return false;
      }
    }
  }

  return true;
}

async function checkAllSeats(session, seats, reservationId) {
  for (let seat of seats) {
    if (!(await checkSeat(session, seat, reservationId))) {
      return false;
    }
  }
  return true;
}
module.exports.validateSeats = validateSeats;
module.exports.findAllReservations = handlersFactory.getAll(Reservation);
module.exports.getReservationById = handlersFactory.getOne(
  Reservation,
  'reservationId'
);
module.exports.createReservation = handlersFactory.createOne(Reservation);
module.exports.updateReservation = catchAsync(async (req, res, next) => {
  let reservation = await Reservation.findById(req.params.reservationId);
  if (!reservation) {
    return next(new AppError('Reservation is not found', 404));
  }

  reservation.seats = req.body.seats ? req.body.seats : reservation.seats;
  reservation.services = req.body.services
    ? req.body.services
    : reservation.services;

  await reservation.save();

  res.status(200).json({
    status: 'success',
    reservation
  });
});

module.exports.deleteReservation = handlersFactory.deleteOne(
  Reservation,
  'reservationId'
);

module.exports.getReservationsForCurrentUser = catchAsync(
  async (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Please, log in or sign up', 401));
    }

    const reservations = await Reservation.find({ user: req.user.id })
      .populate({ path: 'session', select: ['film', 'dateTime'] })
      .populate({ path: 'services.service', select: ['name', 'price'] });

    res.status(200).json({
      status: 'succcess',
      data: reservations
    });
  }
);
