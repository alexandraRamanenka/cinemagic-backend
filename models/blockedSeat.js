const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const blockedSeatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "User Id is required"]
  },
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    require: [true, "Session Id is required"]
  },
  line: { type: Number, require: [true, "Line is required"] },
  seatNumber: {
    type: Number,
    require: [true, "Seat is required"]
  },
  timestamp: { type: Date, default: Date.now(), set: v => Date.now() }
});

module.exports = new mongoose.model("BlockedSeat", blockedSeatSchema);
