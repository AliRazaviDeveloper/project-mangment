const { AuthController } = require('../http/controllers/authController');
const { checkValidationError } = require('../http/middlewares/checkError');
const { authValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/login', AuthController.login);
router.post(
  '/register',
  authValidator(),
  checkValidationError,
  AuthController.register
);
router.post('/forget-password', AuthController.forgetPassword);
module.exports = {
  authRouter: router,
};
