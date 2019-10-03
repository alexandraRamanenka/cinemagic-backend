const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");

module.exports.createOne = (Model, fieldsCleaner) => {
  return catchAsync(async (req, res, next) => {
    const document = await Model.create(fieldsCleaner(req));

    res.status(201).send({
      status: "success",
      data: document
    });
  });
};

module.exports.getAll = Model => {
  return catchAsync(async (req, res, next) => {
    const documents = await Model.find({});

    res.status(200).send({
      status: "success",
      data: documents
    });
  });
};
