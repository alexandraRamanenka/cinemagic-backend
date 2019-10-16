const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const AppError = require('./utiles/appError');
const globalErrorController = require('./controllers/globalErrorController.js');
const routes = require('./routes');

//Parsing middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

app.all('*', (req, res, next) => {
  let err = new AppError(`Cant't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorController);
module.exports = app;
