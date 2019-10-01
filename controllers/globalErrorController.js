const AppError = require('../utiles/appError');

const sendError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return sendError(err, res);
};
