const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Cinemagic!");
});
router.use("/users", require("./usersRoutes"));
router.use("/films", require("./filmRoutes"));
router.use("/cinema", require("./cinemaRoutes"));
router.use("/services", require("./servicesRoutes"));

module.exports = router;
