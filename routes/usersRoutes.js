const router = require("express").Router();
const { createUser, findAllUsers } = require("../controllers/usersController");

router
  .route("/")
  .post(createUser)
  .get(findAllUsers);

module.exports = router;
