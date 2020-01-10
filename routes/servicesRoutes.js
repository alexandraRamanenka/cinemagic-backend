const router = require('express').Router();
const {
  createService,
  findAllServices,
  getServiceById,
  deleteService,
  updateService,
  createServiceType,
  findAllServiceTypes,
  getServiceTypeById,
  deleteServiceType,
  updateServiceType
} = require('../controllers/servicesController');
const { authenticate, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .get(findAllServices)
  .post(authenticate, restrictTo(['admin']), createService);

router
  .route('/types')
  .get(findAllServiceTypes)
  .post(authenticate, restrictTo(['admin']), createServiceType);
router
  .route('/types/:serviceTypeId')
  .get(getServiceTypeById)
  .patch(authenticate, restrictTo(['admin']), updateServiceType)
  .delete(authenticate, restrictTo(['admin']), deleteServiceType);

router
  .route('/:serviceId')
  .get(getServiceById)
  .patch(authenticate, restrictTo(['admin']), updateService)
  .delete(authenticate, restrictTo(['admin']), deleteService);

module.exports = router;
