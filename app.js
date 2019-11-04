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
<<<<<<< HEAD
app.use(cors());
=======
app.use(cors(corsOptions));
>>>>>>> 0fa41de28b48c196c7541edd7ecf11c95e3527fd
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

app.all('*', (req, res, next) => {
  let err = new AppError(`Cant't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorController);
module.exports = app;
