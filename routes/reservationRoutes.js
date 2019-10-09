const router = require("express").Router();
const {
  createReservation,
  findAllReservations,
  getReservationById,
  deleteReservation,
  updateReservation,
  checkSeats
} = require("../controllers/reservationsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, checkSeats, createReservation)
  .get(authenticate, restrictTo(["admin"]), findAllReservations);

router
  .route("/:reservationId")
  .get(authenticate, getReservationById)
  .delete(authenticate, restrictTo(["admin"]), deleteReservation)
  .patch(authenticate, restrictTo(["admin"]), checkSeats, updateReservation);

module.exports = router;
