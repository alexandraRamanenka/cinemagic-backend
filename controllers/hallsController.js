const Hall = require('mongoose').model('Hall');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');

module.exports.findAllHalls = handlersFactory.getAll(Hall);
module.exports.getHallById = handlersFactory.getOne(Hall, 'hallId');
module.exports.createHall = handlersFactory.createOne(Hall);
module.exports.updateHall = handlersFactory.updateOne(Hall, 'hallId');
module.exports.deleteHall = handlersFactory.deleteOne(Hall, 'hallId');
