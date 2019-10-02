const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Cinemagic!");
});
router.use("/users", require("./usersRoutes"));

module.exports = router;
