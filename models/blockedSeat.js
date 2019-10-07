const { Schema, model } = require("mongoose");
const Session = require("./session");

const blockedSeatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "User Id is required"]
  },
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    require: [true, "Session Id Id is required"]
  },
  lineId: { type: Schema.Types.ObjectId, require: [true, "Line is required"] },
  seatNumber: {
    type: Number,
    require: [true, "Seat is required"],
    validate: { validator: checkSeat }
  },
  timestamp: { type: Date, default: Date.now(), set: v => Date.now() }
});

async function checkSeat(seat) {
  const session = await Session.findById(this.sessionId).populate({
    path: "hallId"
  });
  console.log(session);
  const line = session.hallId.seatsSchema.id(this.lineId);
  return line.numberOfSeats >= seat;
}

module.exports = new model("BlockedSeat", blockedSeatSchema);
