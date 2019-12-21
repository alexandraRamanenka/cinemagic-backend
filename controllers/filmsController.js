const Film = require('../models/film');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const handlersFactory = require('./handlersFactory');

module.exports.findAllFilms = handlersFactory.getAll(Film);
module.exports.getFilmById = handlersFactory.getOne(Film, 'filmId');
module.exports.createFilm = handlersFactory.createOne(Film);
module.exports.updateFilm = handlersFactory.updateOne(Film, 'filmId');
module.exports.deleteFilm = handlersFactory.deleteOne(Film, 'filmId');
module.exports.setBestFilmsQuery = (req, res, next) => {
  let queryObj = { ...req.query };
  queryObj['sort'] = 'rate';
  if (!queryObj['limit']) {
    queryObj['limit'] = 5;
  }
  queryObj['page'] = 1;
  req.query = queryObj;
  next();
};
