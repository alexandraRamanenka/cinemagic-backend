const Reservation = require("../models/Reservation");
const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");
const handlersFactory = require("./handlersFactory");

const checkSeat = catchAsync(async (req, res, next) => {
  if (req.body.seats || req.body.sessionId) {
    for (let seat of req.body.seats) {
      let reservations = await Reservation.find({
        sessionId: req.body.sessionId
      });

      for (let reserv of reservations) {
        for (let seatRes of reserv.seats) {
          if (
            seatRes.lineId == seat.lineId &&
            seatRes.seatNumber == seat.seatNumber
          ) {
            return next(new AppError("Seat is already reserved"));
          }
        }
      }
    }
  }
  next();
});
module.exports.checkSeat = checkSeat;
module.exports.findAllReservations = handlersFactory.getAll(Reservation);
module.exports.getReservationById = handlersFactory.getOne(
  Reservation,
  "reservationId"
);
module.exports.createReservation = handlersFactory.createOne(Reservation);
module.exports.updateReservation = catchAsync(async (req, res, next) => {
  let reservation = await Reservation.findById(req.params.reservationId);
  if (!reservation) {
    return next(new AppError("Reservation is not found", 404));
  }

  reservation.seats = req.body.seats ? req.body.seats : reservation.seats;
  reservation.services = req.body.services
    ? req.body.services
    : reservation.services;

  await reservation.save();

  res.status(200).json({
    status: "success",
    reservation
  });
});

module.exports.deleteReservation = handlersFactory.deleteOne(
  Reservation,
  "reservationId"
);
