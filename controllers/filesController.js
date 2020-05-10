const catchAsync = require('../utiles/catchAsync');
const AppError = require('../utiles/appError');

module.exports.attachFile = (fileName, path) => catchAsync((req, res, next) => {
  if (req.files && req.files[fileName]) {
    const file = req.files[fileName];
    const name = file.name + `-${(new Date()).getTime()}`;
    const finalPath = `/public/uploads${path}/${name}`;

    file.mv(finalPath, (err) => {
      if (err) {
        return res.next(new AppError('Cannot save ' + fileName, 400));
      }
      else {
        req[fileName] = finalPath;
        next();
      }
    })
  }
});
