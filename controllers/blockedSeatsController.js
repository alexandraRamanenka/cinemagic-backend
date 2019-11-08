const BlockedSeat = require('mongoose').model('BlockedSeat');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');

module.exports.findAllBlockedSeats = handlersFactory.getAll(BlockedSeat);
module.exports.getBlockedSeatById = handlersFactory.getOne(
  BlockedSeat,
  'blockedSeatId'
);
module.exports.createBlockedSeat = handlersFactory.createOne(BlockedSeat);
module.exports.updateBlockedSeat = handlersFactory.updateOne(
  BlockedSeat,
  'blockedSeatId',
  ['timestamp']
);
module.exports.deleteBlockedSeat = handlersFactory.deleteOne(
  BlockedSeat,
  'blockedSeatId'
);
