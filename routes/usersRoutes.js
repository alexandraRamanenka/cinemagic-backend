const router = require("express").Router();
const {
  createUser,
  findAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getCurrentUser
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
  .get(authenticate, restrictTo(["admin"]), findAllUsers);

router.route("/me").get(authenticate, getCurrentUser);
router
  .route("/:userId")
  .get(authenticate, getUserById)
  .delete(authenticate, restrictTo(["admin"]), deleteUser)
  .patch(authenticate, restrictTo(["admin"]), updateUser);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
