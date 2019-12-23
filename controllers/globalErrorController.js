const AppError = require('../utiles/appError');

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR');
    console.log({ err });

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong...'
    });
  }
};

const handleCastError = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDBFields = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `An item with value of ${value} is already exists!`;
  return new AppError(message, 400);
};

const handleValidationDBError = err => {
  const errors = Object.values(err.errors).map(el => {
    return el.message;
  });

  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = `Invalid token. Please, log in again`;
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = `Your token has been expired. Please, log in again`;
  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastError(error);
      return sendErrorProd(error, res);
    }

    if (err.code === 11000) {
      error = handleDuplicateDBFields(error);
      return sendErrorProd(error, res);
    }

    if (err.name === 'ValidationError') {
      error = handleValidationDBError(error);
      return sendErrorProd(error, res);
    }

    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
      return sendErrorProd(error, res);
    }

    if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
      return sendErrorProd(error, res);
    }

    return sendErrorProd(err, res);
  }
};
