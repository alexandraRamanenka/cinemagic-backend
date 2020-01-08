const Hall = require('mongoose').model('Hall');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const handlersFactory = require('./handlersFactory');

module.exports.findAllHalls = handlersFactory.getAll(Hall);
module.exports.getHallById = handlersFactory.getOne(Hall, 'hallId');
module.exports.createHall = handlersFactory.createOne(Hall);
module.exports.updateHall = handlersFactory.updateOne(Hall, 'hallId', [
  'cinema'
]);
module.exports.deleteHall = handlersFactory.deleteOne(Hall, 'hallId');
module.exports.getCinemaHalls = async cinemaId => {
  const halls = await Hall.find({ cinema: cinemaId });
  return halls;
};
module.exports.deleteCinemaHalls = async cinemaId => {
  await Hall.deleteMany({ cinema: cinemaId });
};
