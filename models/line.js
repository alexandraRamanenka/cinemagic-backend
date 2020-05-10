const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  seatType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SeatType',
    required: [true, 'Seat\'s type is required']
  },

  numberOfSeats: {
    type: Number,
    required: [true, 'Number of seats is required']
  }
});

module.exports = lineSchema;
