const BlockedSeat = require("../models/blockedSeat");
const { AppError } = require("../utiles/appError");

module.exports.notifyClients = function(message) {
  for (let client of this.clients) {
    client.send(JSON.stringify(message));
  }
};

module.exports.addSeat = async function(seat, cb) {
  const blockedSeat = await BlockedSeat.create(seat);
  setTimeout(function() {
    BlockedSeat.findOneAndDelete({ _id: blockedSeat._id });
    if (cb) {
      cb();
    }
  }, process.env.SEAT_BLOCKING_TIME * 1000);
  return blockedSeat;
};

module.exports.removeSeat = async function(seat) {
  const result = await BlockedSeat.deleteOne({
    session: seat.session,
    line: seat.line,
    seatNumber: seat.seatNumber,
    user: seat.user
  });
  return result;
};
