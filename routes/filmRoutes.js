const router = require("express").Router();
const {
  createFilm,
  findAllFilms,
  getFilmById,
  deleteFilm,
  updateFilm
} = require("../controllers/filmsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, restrictTo(["admin"]), createFilm)
  .get(findAllFilms);

router
  .route("/:filmId")
  .get(getFilmById)
  .delete(authenticate, restrictTo(["admin"]), deleteFilm)
  .patch(authenticate, restrictTo(["admin"]), updateFilm);

module.exports = router;
