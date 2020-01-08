const router = require('express').Router();
const {
  createSeatType,
  findAllSeatTypes,
  getSeatTypeById,
  deleteSeatType,
  updateSeatType
} = require('../controllers/seatTypesController');
const { authenticate, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .post(authenticate, restrictTo(['admin']), createSeatType)
  .get(findAllSeatTypes);

router
  .route('/:seatTypeId')
  .get(getSeatTypeById)
  .delete(authenticate, restrictTo(['admin']), deleteSeatType)
  .patch(authenticate, restrictTo(['admin']), updateSeatType);

module.exports = router;
