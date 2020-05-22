const SeatType = require('../models/seatType');
const handlersFactory = require('./handlersFactory');

module.exports.findAllSeatTypes = handlersFactory.getAll(SeatType);
module.exports.getSeatTypeById = handlersFactory.getOne(SeatType, 'seatTypeId');
module.exports.createSeatType = handlersFactory.createOne(SeatType);
module.exports.updateSeatType = handlersFactory.updateOne(
  SeatType,
  'seatTypeId'
);
module.exports.deleteSeatType = handlersFactory.deleteOne(
  SeatType,
  'seatTypeId'
);
