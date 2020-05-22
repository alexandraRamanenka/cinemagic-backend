const Hall = require('mongoose').model('Hall');
const handlersFactory = require('./handlersFactory');
const { deleteSessionsWithoutHalls } = require('./sessionsController');

module.exports.findAllHalls = handlersFactory.getAll(Hall);
module.exports.getHallById = handlersFactory.getOne(Hall, 'hallId');
module.exports.createHall = handlersFactory.createOne(Hall);
module.exports.updateHall = handlersFactory.updateOne(Hall, 'hallId',
  [  'cinema' ]);
module.exports.deleteHall = handlersFactory.deleteOne(Hall, 'hallId');
module.exports.getCinemaHalls = async cinemaId => {
  const halls = await Hall.find({ cinema: cinemaId });
  return halls;
};
module.exports.deleteCinemaHalls = async cinemaId => {
  const deletedHalls = await Hall.deleteMany({ cinema: cinemaId });
  if (deletedHalls.deletedCount > 0) {
    let hallsIds = await Hall.find({}, '_id');
    hallsIds = hallsIds.map(hall => hall._id);
    deleteSessionsWithoutHalls(hallsIds);
  }
};
