const router = require("express").Router();
const { createUser, findAllUsers } = require("../controllers/usersController");
const { signup, login } = require("../controllers/authController");

router
  .route("/")
  .post(createUser)
  .get(findAllUsers);

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
