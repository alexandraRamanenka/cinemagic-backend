const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");

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
    const documents = await Model.find({});

    res.status(200).json({
      status: "success",
      data: documents
    });
  });
};
