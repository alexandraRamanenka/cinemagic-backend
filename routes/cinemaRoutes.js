const router = require("express").Router();
const {
  createCinema,
  findAllCinemas,
  getCinemaById,
  deleteCinema,
  updateCinema
} = require("../controllers/cinemaController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(findAllCinemas)
  .post(authenticate, restrictTo(["admin"]), createCinema);
router
  .route("/:cinemaId")
  .get(getCinemaById)
  .patch(authenticate, restrictTo(["admin"]), updateCinema)
  .delete(authenticate, restrictTo["admin"], deleteCinema);

module.exports = router;
