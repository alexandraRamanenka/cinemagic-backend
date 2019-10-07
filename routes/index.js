const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Cinemagic!");
});
router.use("/users", require("./usersRoutes"));
<<<<<<< HEAD
router.use("/films", require("./filmRoutes"));
=======
router.use("/cinema", require("./cinemaRoutes"));
>>>>>>> cinemas

module.exports = router;
