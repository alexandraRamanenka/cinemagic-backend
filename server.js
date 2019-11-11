require('dotenv').config();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.WS_PORT });
const mongoose = require('mongoose');
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

wss.on('connection', ws => {
  console.log('ws connection');
  ws.on('message', message => console.log(`Recieved message: ${message}`));
  ws.send('ho!');
});

//Db configuration
const db_connection_str = process.env.DB_URL.replace(
  '<username>',
  process.env.DB_USER
).replace('<password>', process.env.DB_PASSWORD);
console.log(db_connection_str);
mongoose.connect(
  db_connection_str,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => {
    console.log('Db connected');
  }
);

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION. App crashed...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
