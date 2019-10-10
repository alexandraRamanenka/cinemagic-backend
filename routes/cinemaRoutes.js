const router = require('express').Router();
const {
  createCinema,
  findAllCinema,
  getCinemaById,
  deleteCinema,
  updateCinema
} = require('../controllers/cinemaController');
const { authenticate, restrictTo } = require('../controllers/authController');
const { getCinemaSchedule } = require('../controllers/scheduleController');

router
  .route('/')
  .get(findAllCinema)
  .post(authenticate, restrictTo(['admin']), createCinema);
router.get('/:cinemaId/schedule', getCinemaSchedule);
router
  .route('/:cinemaId')
  .get(getCinemaById)
  .patch(authenticate, restrictTo(['admin']), updateCinema)
  .delete(authenticate, restrictTo(['admin']), deleteCinema);

module.exports = router;
