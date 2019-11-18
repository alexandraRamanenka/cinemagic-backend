const BlockedSeat = require("../models/blockedSeat");
const { AppError } = require("../utiles/appError");

module.exports.notifyClients = function(message) {
  for (let client of this.clients) {
    client.send(JSON.stringify(message));
  }
};

module.exports.addSeat = async function(seat) {
  const blockedSeat = await BlockedSeat.create(seat);
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
