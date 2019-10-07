const router = require("express").Router();
const {
  createHall,
  findAllHalls,
  getHallById,
  deleteHall,
  updateHall
} = require("../controllers/hallsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, restrictTo(["admin"]), createHall)
  .get(findAllHalls);

router
  .route("/:hallId")
  .get(getHallById)
  .delete(authenticate, restrictTo(["admin"]), deleteHall)
  .patch(authenticate, restrictTo(["admin"]), updateHall);

module.exports = router;
