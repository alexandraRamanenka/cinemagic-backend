const Film = require('../models/film');
const AppError = require('../utiles/appError');
const catchAsync = require('../utiles/catchAsync');
const handlersFactory = require('./handlersFactory');

module.exports.findAllFilms = handlersFactory.getAll(Film);
module.exports.getFilmById = handlersFactory.getOne(Film, 'filmId');
module.exports.createFilm = handlersFactory.createOne(Film);
module.exports.updateFilm = handlersFactory.updateOne(Film, 'filmId');
module.exports.deleteFilm = handlersFactory.deleteOne(Film, 'filmId');
