const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Session = require("./session");
const SeatType = require("./seatType");
const Service = require("./service");
const BlockedSeat = mongoose.model("BlockedSeat");
const AppError = require("../utiles/appError");

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "User Id is required"]
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    require: [true, "Session Id Id is required"]
  },
  seats: [
    {
      line: {
        type: Number,
        require: [true, "Line is required"]
      },
      seatNumber: {
        type: Number,
        require: [true, "Seat is required"]
      }
    }
  ],
  services: [
    {
      service: {
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

const checkSeats = async function(next) {
  const session = await Session.findById(this.session).populate({
    path: "hall"
  });

  for (let seat of this.seats) {
    if (seat.line > session.hall.seatsSchema.length || seat.line < 1) {
      return next(
        new AppError(`Line with number ${seat.line} not exists`, 400)
      );
    }

    const line = session.hall.seatsSchema[seat.line - 1];

    const blocked = await BlockedSeat.findOne({
      line: seat.line,
      seatNumber: seat.seatNumber
    });

    if (
      line.numberOfSeats < seat.seatNumber ||
      seat.seatNumber < 1 ||
      blocked
    ) {
      return next(
        new AppError(
          `Seat with number ${seat.seatNumber} at line ${seat.line} is unavailable`,
          400
        )
      );
    }
  }
};

const getPrice = async function(next) {
  let session = await Session.findById(this.session).populate("hall");
  let price = session.price;
  for (let seat of this.seats) {
    let seatType = await SeatType.findById(
      session.hall.seatsSchema[seat.line].seatType
    );
    price += seatType.price;
  }
  for (let serv of this.services) {
    let service = await Service.findById(serv.service);
    price += service.price * serv.amount;
  }

  this.price = price;
  next();
};

reservationSchema.pre("save", checkSeats);
reservationSchema.pre("save", getPrice);
reservationSchema.pre(/^find/, function(next) {
  this.populate({
    path: "session",
    select: ["film", "dateTime", "hall"]
  }).populate({ path: "services.service", select: ["name"] });
  next();
});

module.exports = new model("Reservation", reservationSchema);
