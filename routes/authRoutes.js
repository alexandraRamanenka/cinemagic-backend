const router = require('express').Router();
const {
  signup,
  login,
  logout,
  verifyUser
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verifyUser', verifyUser);
router.post('/logout', logout);

module.exports = router;
