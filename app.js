const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const AppError = require('./utiles/appError');
const globalErrorController = require('./controllers/globalErrorController.js');
const routes = require('./routes');

let corsOptions = {
  origin: function(origin, callback) {
    var isWhitelisted = process.env.ORIGINS_WHITE_LIST.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

//Parsing middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.all('*', (req, res, next) => {
  let err = new AppError(`Cant't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorController);
module.exports = app;
