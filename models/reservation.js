const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Session = require("./session");
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
  date: { type: Date, default: Date.now(), set: v => Date.now() }
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

reservationSchema.virtual("price").get(async function() {
  this.populate("sessionId")
    .populate({
      path: "seats",
      populate: { path: "lineId", populate: { path: "typeId" } }
    })
    .populate({ path: "services", populate: { path: "serviceId" } });
  let price = this.sessionId.price;
  for (let seat of this.seats) {
    price += seat.lineId.typeId.price;
  }
  for (let serv in this.services) {
    price += serv.serviceId.price * serv.amount;
  }
  return price;
});

module.exports = new model("Reservation", reservationSchema);
