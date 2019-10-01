const express = require('express');
const app = express();
const AppError = require('./utiles/appError');
const globalErrorController = require('./controllers/globalErrorController.js');
const routes = require('./routes');

//Parsing middleware
app.use(express.json());

app.use('/', routes);

app.all('*', (req, res, next) => {
  let err = new AppError(`Cant't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorController);
module.exports = app;
