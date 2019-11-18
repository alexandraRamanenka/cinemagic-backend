require("dotenv").config();
const { authenticateWsConnection } = require("./controllers/authController");
const WebSocket = require("ws");
const {
  notifyClients,
  addSeat,
  removeSeat
} = require("./controllers/webSocketController");
const mongoose = require("mongoose");
const app = require("./app");
const http = require("http");

const port = process.env.PORT || 5000;

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXEPTION. App crashed...");
  console.log(err.name, err.message, err);

  process.exit(1);
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const wss = new WebSocket.Server({
  server,
  verifyClient: authenticateWsConnection,
  clientTracking: true
});

wss.broadcast = notifyClients;

wss.on("connection", (ws, req) => {
  console.log("Connection");
  const user = req.user;

  ws.on("message", wsEvent => {
    const wsMessage = JSON.parse(wsEvent);
    const { event, data } = JSON.parse(wsMessage);
    data.user = user.id;

    switch (event) {
      case "addSeat":
        addSeat(data);
        wss.broadcast({ event: "seatAdded", data });
        break;

      case "removeSeat":
        removeSeat(data);
        wss.broadcast({ event: "seatRemoved", data });
        break;

      case "reserve":
        console.log(`Reserve seats: ${data}`);
        break;
    }
  });

  ws.on("close", (code, reason) => {
    console.log(`Disconnected`);
  });
});

//Db configuration
const db_connection_str = process.env.DB_URL.replace(
  "<username>",
  process.env.DB_USER
).replace("<password>", process.env.DB_PASSWORD);
console.log(db_connection_str);
mongoose.connect(
  db_connection_str,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => {
    console.log("Db connected");
  }
);

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION. App crashed...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
