const mongoose = require("mongoose");

const seatTypeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String },
  price: { type: Number, required: [true, "Price is required"] }
});

module.exports = new mongoose.model("SeatType", seatTypeSchema);
