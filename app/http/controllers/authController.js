const { UserModel } = require('../../models/user');
const { hashString, compareHashString } = require('../../modules/utility');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user)
        throw { status: 401, message: 'ایمیل یا رمز عبور نادرست می باشد . ' };
      const plainPassword = compareHashString(password, user.password);
      if (!plainPassword)
        throw { status: 401, message: 'ایمیل یا رمز عبور نادرست می باشد . ' };
      res.status(200).json({
        status: 200,
        success: false,
        result: {
          message: 'شما با موفقیت وارد اکانت خود شدید . ',
          token: '',
        },
      });
    } catch (error) {
      next(error);
    }
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
