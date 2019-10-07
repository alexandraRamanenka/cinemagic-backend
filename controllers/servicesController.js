const Service = require("../models/service");
const AppError = require("../utiles/appError");
const handlersFactory = require("./handlersFactory");

module.exports.findAllServices = handlersFactory.getAll(Service);
module.exports.getServiceById = handlersFactory.getOne(Service, "serviceId");
module.exports.createService = handlersFactory.createOne(Service);
module.exports.updateService = handlersFactory.updateOne(Service, "serviceId");
module.exports.deleteService = handlersFactory.deleteOne(Service, "serviceId");
