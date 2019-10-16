const express = require('express');
const cors = require('cors');
const app = express();
const AppError = require('./utiles/appError');
const globalErrorController = require('./controllers/globalErrorController.js');
const routes = require('./routes');

//Parsing middleware
<<<<<<< HEAD

=======
app.use(cors());
>>>>>>> e5b62d498e38a3b0493db420c8ceea67cf0ea4fe
app.use(express.json());
app.use(cors());

app.use('/', routes);

app.all('*', (req, res, next) => {
  let err = new AppError(`Cant't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorController);
module.exports = app;
