const { Schema, model } = require('mongoose');
const lineSchema = require('./line');
const Cinema = require('./cinema');
const Reservation = require('./reservation');
const Session = require('mongoose').model('Session');
const AppError = require('../utiles/appError');

const hallSchema = new Schema(
  {
    cinema: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: [true, 'Cinema is required']
    },
    seatsSchema: {
      type: [lineSchema],
      required: [true, 'Seats schema is required']
    },
    name: {
      type: String,
      required: [true, 'Hall name is required']
    },
    number: {
      type: Number
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

async function getHallNumber(cinemaId) {
  const cinema = await Cinema.findById(cinemaId, 'halls');
  const { halls } = cinema;
  return halls.length + 1;
}

async function checkHallNumber(number, cinemaId) {
  const cinema = await Cinema.findById(cinemaId, 'halls');
  const { halls } = cinema;
  let isDuplicated = false;
  halls.forEach(hall => {
    if (hall.number === number) {
      isDuplicated = true;
      return;
    }
  });

  return !isDuplicated;
}

async function isReadyToDeleteOrUpdate(hallId) {
  const sessionsIds = await Session.find({
    hall: hallId,
    dateTime: { $gte: new Date() }
  });

  const reservations = await Reservation.find({
    session: { $in: sessionsIds }
  });

  if (reservations && reservations.length) {
    return false;
  }
  return true;
}

async function cleanHallSessionsAfterDelete(hallId) {
  const result = await Session.deleteMany({ hall: hallId });
}

async function checkForActiveReservations(next) {
  const ableToChange = await isReadyToDeleteOrUpdate(this._conditions._id);

  if (ableToChange) {
    await cleanHallSessionsAfterDelete(this._conditions._id);
    next();
  }
  next(new AppError('Cannot change hall, cause it have active reservations!'));
}

hallSchema.virtual('seatsNumber').get(function() {
  let seats = this.seatsSchema.reduce((acc, line) => {
    return (acc += line.numberOfSeats);
  }, 0);
  return seats;
});

hallSchema.pre('deleteOne', checkForActiveReservations);
hallSchema.pre('findOneAndUpdate', checkForActiveReservations);

hallSchema.pre('save', async function(next) {
  if (!this.number || this.number === null) {
    this.number = await getHallNumber(this.cinema);
    next();
  } else {
    const isNotDuplicatedNumber = await checkHallNumber(
      this.number,
      this.cinema
    );
    if (isNotDuplicatedNumber) {
      next();
    }
    next(
      new AppError(
        `There is already a hall with number ${this.number} in this cinema!`,
        400
      )
    );
  }
});

hallSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'seatsSchema.seatType'
  });
  next();
});
module.exports = new model('Hall', hallSchema);
