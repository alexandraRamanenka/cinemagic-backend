const router = require("express").Router();
const {
  createSession,
  findAllSessions,
  getSessionById,
  deleteSession,
  updateSession
} = require("../controllers/sessionsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, restrictTo(["admin"]), createSession)
  .get(findAllSessions);

router
  .route("/:sessionId")
  .get(getSessionById)
  .delete(authenticate, restrictTo(["admin"]), deleteSession)
  .patch(authenticate, restrictTo(["admin"]), updateSession);

module.exports = router;
