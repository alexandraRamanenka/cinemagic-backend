const router = require('express').Router();
const {
  createCinema,
  findAllCinema,
  getCinemaById,
  deleteCinema,
  updateCinema,
  preDelete,
  getCinemaServices
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
  .delete(authenticate, restrictTo(['admin']), preDelete, deleteCinema);
router.route('/:cinemaId/services').get(getCinemaServices);

module.exports = router;
