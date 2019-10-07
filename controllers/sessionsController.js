const Session = require("../models/session");
const AppError = require("../utiles/appError");
const handlersFactory = require("./handlersFactory");

module.exports.findAllSessions = handlersFactory.getAll(Session);
module.exports.getSessionById = handlersFactory.getOne(Session, "sessionId");
module.exports.createSession = handlersFactory.createOne(Session);
module.exports.updateSession = handlersFactory.updateOne(Session, "sessionId");
module.exports.deleteSession = handlersFactory.deleteOne(Session, "sessionId");
