const router = require("express").Router();
const {
  createBlockedSeat,
  findAllBlockedSeats,
  getBlockedSeatById,
  deleteBlockedSeat,
  updateBlockedSeat
} = require("../controllers/blockedSeatsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(findAllBlockedSeats)
  .post(authenticate, restrictTo(["admin"]), createBlockedSeat);
router
  .route("/:blockedSeatId")
  .get(getBlockedSeatById)
  .patch(authenticate, restrictTo(["admin"]), updateBlockedSeat)
  .delete(authenticate, restrictTo(["admin"]), deleteBlockedSeat);

module.exports = router;
