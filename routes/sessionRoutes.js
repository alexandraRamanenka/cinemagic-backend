const router = require("express").Router();
const {
  createSession,
  findAllSessions,
  getSessionById,
  deleteSession,
  updateSession,
  validateSession
} = require("../controllers/sessionsController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, restrictTo(["admin"]), validateSession, createSession)
  .get(findAllSessions);

router
  .route("/:sessionId")
  .get(getSessionById)
  .delete(authenticate, restrictTo(["admin"]), deleteSession)
  .patch(authenticate, restrictTo(["admin"]), validateSession, updateSession);

module.exports = router;
