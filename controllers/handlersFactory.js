const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");
const ApiFeatures = require("../utiles/apiFeatures");

module.exports.createOne = Model => {
  return catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: document
    });
  });
};

module.exports.getAll = Model => {
  return catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query).filter();
    const documents = await features.query;

    res.status(200).json({
      status: "success",
      data: documents
    });
  });
};

module.exports.deleteOne = (Model, key) => {
  return catchAsync(async (req, res, next) => {
    const result = await Model.deleteOne({ _id: req.params[key] });

    if (result === 0) {
      return next(
        new AppError(`Document with id ${req.params[key]} not found`, 404)
      );
    }
    res.status(200).json({
      status: "success"
    });
  });
};

module.exports.getOne = (Model, key, filterFunc) => {
  return catchAsync(async (req, res, next) => {
    let document = await Model.findById(req.params[key]);
    if (!document) {
      return next(
        new AppError(`Document with id ${req.params[key]} not found`, 404)
      );
    }
    const userRole = req.user ? req.user.role : "guest";
    document = filterFunc(document, userRole);
    res.status(200).json({
      status: "success",
      data: document
    });
  });
};

module.exports.updateOne = (Model, key, forbiddenFields) => {
  return catchAsync(async (req, res, next) => {
    for (let key of forbiddenFields) {
      if (req.body[key]) {
        delete req.body[key];
      }
    }
    const document = await Model.findOneAndUpdate(
      { _id: req.params[key] },
      req.body,
      { new: true }
    );

    if (!document) {
      return next(
        new AppError(`Document with id ${req.params[key]} not found`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: document
    });
  });
};
