const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  city: { type: String },
  name: { type: String },
  adress: { type: String }
});

module.exports = new mongoose.model("Cinema", cinemaSchema);
