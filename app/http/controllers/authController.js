const { UserModel } = require('../../models/user');
const { hashString } = require('../../modules/utility');

class AuthController {
  login(req, res, next) {
    res.json({
      message: 'Login',
    });
  }

  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hashPassword = hashString(password);
      const user = await UserModel.create({
        username,
        email,
        mobile,
        password: hashPassword,
      });
      return res.status(201).json({
        status: 201,
        success: true,
        result: {
          message: 'ثبت نام شما با موفقیت انجام گردیده شد . ',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  forgetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
