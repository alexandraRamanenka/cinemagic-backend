const { Schema, model } = require('mongoose');
const lineSchema = require('./line');

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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

hallSchema.virtual('seatsNumber').get(function() {
  let seats = this.seatsSchema.reduce((acc, line) => {
    return (acc += line.numberOfSeats);
  }, 0);
  return seats;
});

hallSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'seatsSchema.seatType'
  });
  next();
});
module.exports = new model('Hall', hallSchema);
