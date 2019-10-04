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
