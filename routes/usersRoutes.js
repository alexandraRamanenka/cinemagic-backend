const router = require("express").Router();
const { createUser, findAllUsers } = require("../controllers/usersController");
const {
  signup,
  login,
  authenticate,
  restrictTo
} = require("../controllers/authController");

router
  .route("/")
  .post(authenticate, restrictTo(["admin"]), createUser)
  .get(authenticate, findAllUsers);

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
