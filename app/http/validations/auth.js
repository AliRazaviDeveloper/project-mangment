const { body } = require('express-validator');
const { UserModel } = require('../../models/user');
function registerValidation() {
  return [
    body('email')
      .isEmail()
      .withMessage('ایمیل را صحیح وارد کنید . ')
      .notEmpty()
      .withMessage('ایمیل نباید خالی باشد . ')
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw 'ایمیل قبلا در سیستم ثبت شده است . ';
      }),
    body('username')
      .notEmpty()
      .withMessage('نام کاربری نمی تواند خالی باشد . ')
      .isLength({ min: 4, max: 25 })
      .withMessage('نام کاربری باید بین ۴ و ۲۵ کارکتر باشد .')
      .custom(async (username) => {
        const user = await UserModel.findOne({ username });
        if (user) throw 'نام کاربری قبلا در سیستم ثبت شده است . ';
      }),
    body('password').custom((value, { req }) => {
      if (!value) throw 'رمز عبور نمی تواند خالی باشد . ';
      if (value !== req?.body?.password_confirmation)
        throw 'رمز عبور باید با تکرار آن یکسان باشد . ';
      return true;
    }),

    body('mobile')
      .isMobilePhone('fa-IR')
      .withMessage('فرمت موبایل به درستی وارد شود . ')
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw ' شماره موبایل قبلا در سیستم ثبت شده است . ';
      }),
  ];
}

function loginValidation() {
  return [
    body('email')
      .isEmail()
      .withMessage('ایمیل را صحیح وارد کنید . ')
      .isEmpty()
      .withMessage('ایمیل نباید خالی باشد .'),
    body('password').isEmpty('پسورد نباید خالی باشد . '),
  ];
}

module.exports = {
  registerValidation,
  loginValidation,
};
