const router = require("express").Router();
const {
  createCinema,
  findAllCinema,
  getCinemaById,
  deleteCinema,
  updateCinema
} = require("../controllers/cinemaController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(findAllCinema)
  .post(authenticate, restrictTo(["admin"]), createCinema);
router
  .route("/:cinemaId")
  .get(getCinemaById)
  .patch(authenticate, restrictTo(["admin"]), updateCinema)
  .delete(authenticate, restrictTo(["admin"]), deleteCinema);

module.exports = router;
