const router = require("express").Router();
const {
  createUser,
  findAllUsers,
  getUserById
} = require("../controllers/usersController");
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

router.route("/:userId").get(authenticate, restrictTo(["admin"]), getUserById);

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
