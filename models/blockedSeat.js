const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const blockedSeatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: [true, 'User Id is required']
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      require: [true, 'Session Id is required']
    },
    line: { type: Number, require: [true, 'Line is required'] },
    seatNumber: {
      type: Number,
      require: [true, 'Seat is required']
    }
  },
  { timestamps: true }
);

blockedSeatSchema.post('save', async function(next) {
  const id = this._id;
  const collection = this.collection;

  setTimeout(function() {
    collection.findOneAndDelete({ _id: id });
  }, process.env.SEAT_BLOCKING_TIME * 1000);
});

const BlockedSeat = new mongoose.model('BlockedSeat', blockedSeatSchema);
module.exports = BlockedSeat;
