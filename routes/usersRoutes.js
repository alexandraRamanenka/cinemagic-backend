const router = require("express").Router();
const { createUser, findAllUsers } = require("../controllers/usersController");
const { signup } = require("../controllers/authController");

router
  .route("/")
  .post(createUser)
  .get(findAllUsers);

router.post("/signup", signup);
module.exports = router;
