const Cinema = require('../models/cinema');
const catchAsync = require('../utiles/catchAsync');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');

module.exports.cleanCinemaFields = req => {
  let cinema = req.body;
  cinema.city = req.body.city || null;
  cinema.name = req.body.name || null;
  cinema.adress = req.body.address || null;
  return cinema;
};

const filterForRole = (cinema, role) => {
  switch (role) {
    case 'admin':

    case 'user':

    default:
      return cinema;
  }
};

module.exports.createCinema = handlersFactory.createOne(Cinema);

module.exports.findAllCinema = handlersFactory.getAll(Cinema);

module.exports.getCinemaById = handlersFactory.getOne(
  Cinema,
  'cinemaId',
  filterForRole
);

module.exports.deleteCinema = handlersFactory.deleteOne(Cinema, 'cinemaId');
module.exports.updateCinema = handlersFactory.updateOne(Cinema, 'cinemaId', [
  'city',
  'address'
]);
