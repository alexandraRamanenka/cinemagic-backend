require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5000;

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXEPTION. App crashed...');
  console.log(err.name, err.message, err);

  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION. App crashed...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
