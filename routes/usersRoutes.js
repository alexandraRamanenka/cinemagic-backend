const router = require("express").Router();
const { createUser, findAllUsers } = require("../controllers/usersController");
const {
  signup,
  login,
  authenticate
} = require("../controllers/authController");

router
  .route("/")
  .post(createUser)
  .get(authenticate, findAllUsers);

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
