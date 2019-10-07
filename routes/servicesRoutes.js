const router = require("express").Router();
const {
  createService,
  findAllServices,
  getServiceById,
  deleteService,
  updateService
} = require("../controllers/servicesController");
const { authenticate, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(findAllServices)
  .post(authenticate, restrictTo(["admin"]), createService);
router
  .route("/:serviceId")
  .get(getServiceById)
  .patch(authenticate, restrictTo(["admin"]), updateService)
  .delete(authenticate, restrictTo(["admin"]), deleteService);

module.exports = router;
