const { validationResult } = require('express-validator');

function checkValidationError(req, res, next) {
  let message = {};
  const result = validationResult(req);
  console.log(result);
  message = {};
  if (result?.errors.length > 0) {
    result.errors.forEach((err) => {
      message[err.param] = err.msg;
    });

    res.status(400).json({
      status: 400,
      success: false,
      message,
    });
  }

  next();
}

module.exports = {
  checkValidationError,
};
