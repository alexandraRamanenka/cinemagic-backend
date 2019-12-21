const router = require('express').Router({ mergeParams: true });
const {
  createSession,
  findAllSessions,
  getSessionById,
  deleteSession,
  updateSession,
  validateSession,
  getTodaySessions
} = require('../controllers/sessionsController');
const { authenticate, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .post(authenticate, restrictTo(['admin']), validateSession, createSession)
  .get(findAllSessions);

router.get('/today', getTodaySessions);

router
  .route('/:sessionId')
  .get(getSessionById)
  .delete(authenticate, restrictTo(['admin']), deleteSession)
  .patch(authenticate, restrictTo(['admin']), validateSession, updateSession);

module.exports = router;
