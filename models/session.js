const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
  {
    film: {
      type: Schema.Types.ObjectId,
      ref: 'Film',
      require: [true, 'Film is required']
    },
    dateTime: {
      type: Date,
      require: [true, 'Date and time are required']
    },
    hall: {
      type: Schema.Types.ObjectId,
      ref: 'Hall',
      require: [true, 'Hall is required']
    },
    price: {
      type: Number,
      require: [true, 'Price is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

sessionSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'session'
});

sessionSchema.virtual('freeSeats').get(function() {
  let reservedSeats = this.reservations.reduce((acc, res) => {
    return (acc += res.seats.length);
  }, 0);
  return this.hall.seatsNumber - reservedSeats;
});

sessionSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'film'
  })
    .populate('reservations')
    .populate({ path: 'hall', populate: { path: 'cinema' } });
  next();
});

module.exports = new model('Session', sessionSchema);
