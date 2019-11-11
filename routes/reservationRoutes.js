const router = require('express').Router();
const {
  createReservation,
  findAllReservations,
  getReservationById,
  deleteReservation,
  updateReservation,
  validateSeats
} = require('../controllers/reservationsController');
const { authenticate, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .post(authenticate, validateSeats, createReservation)
  .get(authenticate, restrictTo(['admin']), findAllReservations);

router
  .route('/:reservationId')
  .get(authenticate, getReservationById)
  .delete(authenticate, restrictTo(['admin']), deleteReservation)
  .patch(authenticate, restrictTo(['admin']), validateSeats, updateReservation);

module.exports = router;
