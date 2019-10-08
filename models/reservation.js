const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Session = require("./session");
const SeatType = require("./seatType");
const Service = require("./service");
const BlockedSeat = mongoose.model("BlockedSeat");

const reservationSchema = new Schema({
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
  seats: [
    {
      lineId: {
        type: Schema.Types.ObjectId,
        require: [true, "Line is required"]
      },
      seatNumber: {
        type: Number,
        require: [true, "Seat is required"],
        validate: { validator: checkSeat }
      }
    }
  ],
  services: [
    {
      serviceId: {
        type: Schema.Types.ObjectId,
        ref: "Service"
      },
      amount: {
        type: Number,
        default: 1
      }
    }
  ],
  date: { type: Date, default: Date.now(), set: v => Date.now() },
  price: { type: Number }
});

async function checkSeat(seat) {
  let parent = this.parent();
  const session = await Session.findById(parent.sessionId).populate({
    path: "hallId"
  });
  const line = await session.hallId.seatsSchema.id(this.lineId);

  const blocked = await BlockedSeat.findOne({
    lineId: this.lineId,
    seatNumber: seat
  });

  return line.numberOfSeats >= seat && !blocked;
}

reservationSchema.pre("save", async function(next) {
  let session = await Session.findById(this.sessionId).populate("hallId");
  let price = session.price;
  for (let seat of this.seats) {
    let seatType = await SeatType.findById(
      session.hallId.seatsSchema.id(seat.lineId).typeId
    );
    price += seatType.price;
  }
  for (let serv of this.services) {
    let service = await Service.findById(serv.serviceId);
    price += service.price * serv.amount;
  }

  this.price = price;
  next();
});

module.exports = new model("Reservation", reservationSchema);
