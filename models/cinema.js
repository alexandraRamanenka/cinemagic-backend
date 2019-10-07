const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  city: { type: String, required: [true, "The city is required"] },
  name: { type: String, required: [true, "Each cinema must have a name"] },
  adress: { type: String, required: [true, "The adress is required"] }
});

module.exports = new mongoose.model("Cinema", cinemaSchema);
