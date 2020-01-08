const Cinema = require('../models/cinema');
const catchAsync = require('../utiles/catchAsync');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');
const { getCinemaHalls, deleteCinemaHalls } = require('./hallsController');
const { getHallsFutureReservations } = require('./reservationsController');

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

const postDelete = async cinemaId => {
  await deleteCinemaHalls(cinemaId);
};
module.exports.postDelete = postDelete;

module.exports.deleteCinema = handlersFactory.deleteOne(
  Cinema,
  'cinemaId',
  postDelete
);
module.exports.updateCinema = handlersFactory.updateOne(Cinema, 'cinemaId', [
  'city',
  'address'
]);

module.exports.preDelete = catchAsync(async (req, res, next) => {
  const halls = await getCinemaHalls(req.params.cinemaId);

  for (let { _id } of halls) {
    const reservations = await getHallsFutureReservations(_id);
    if (reservations && reservations.length > 0) {
      return next(
        new AppError(
          'Cinema is not allowed to be deleted, because it has active reservations!',
          401
        )
      );
    }
  }

  return next();
});
