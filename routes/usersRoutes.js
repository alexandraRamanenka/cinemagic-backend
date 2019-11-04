const router = require('express').Router();
const {
  createUser,
  findAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getCurrentUser,
  updateMe
} = require('../controllers/usersController');
const { authenticate, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .post(authenticate, restrictTo(['admin']), createUser)
  .get(authenticate, restrictTo(['admin']), findAllUsers);

router
  .route('/me')
  .get(authenticate, getCurrentUser)
  .post(authenticate, updateMe);
router
  .route('/:userId')
  .get(authenticate, getUserById)
  .delete(authenticate, restrictTo(['admin']), deleteUser)
  .patch(authenticate, restrictTo(['admin']), updateUser);

module.exports = router;
