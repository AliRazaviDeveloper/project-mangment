const { AuthController } = require('../http/controllers/authController');
const { checkValidationError } = require('../http/middlewares/checkError');
const {
  registerValidation,
  loginValidation,
} = require('../http/validations/auth');

const router = require('express').Router();

router.post('/login', AuthController.login);
router.post(
  '/register',
  registerValidation(),
  checkValidationError,
  AuthController.register
);

router.post(
  '/register',
  loginValidation(),
  checkValidationError,
  AuthController.login
);
router.post('/forget-password', AuthController.forgetPassword);
module.exports = {
  authRouter: router,
};
