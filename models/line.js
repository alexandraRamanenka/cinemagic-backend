const { Schema, model } = require("mongoose");

const lineSchema = new Schema({
  seatType: { type: Schema.Types.ObjectId, ref: "SeatType}" },

  numberOfSeats: {
    type: Number,
    required: [true, "Number of seats is required"]
  }
});

module.exports = lineSchema;
