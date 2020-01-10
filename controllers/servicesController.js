const Service = require('../models/service');
const ServiceType = require('../models/serviceType');
const AppError = require('../utiles/appError');
const handlersFactory = require('./handlersFactory');

module.exports.findAllServices = handlersFactory.getAll(Service);
module.exports.getServiceById = handlersFactory.getOne(Service, 'serviceId');
module.exports.createService = handlersFactory.createOne(Service);
module.exports.updateService = handlersFactory.updateOne(Service, 'serviceId');
module.exports.deleteService = handlersFactory.deleteOne(Service, 'serviceId');

module.exports.findAllServiceTypes = handlersFactory.getAll(ServiceType);
module.exports.getServiceTypeById = handlersFactory.getOne(
  ServiceType,
  'serviceTypeId'
);
module.exports.createServiceType = handlersFactory.createOne(ServiceType);
module.exports.updateServiceType = handlersFactory.updateOne(
  ServiceType,
  'serviceTypeId'
);
module.exports.deleteServiceType = handlersFactory.deleteOne(
  ServiceType,
  'serviceTypeId'
);
