const createHttpError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const {
  numberRandom,
  SignAccessToken,
  VerifyRefreshToken,
  SignRefreshToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { ROLES } = require("../../../../utils/constants");
const Controller = require("../../contoller");

class UserAuthController extends Controller {
  //این متد برای ثبتنام و ارسال کد استفاده می شود
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = numberRandom();

      const result = await this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  //بررسی کد  وارد شده و ورود به سایت
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;

      const user = await UserModel.findOne({ mobile });
      if (!user)
        throw createHttpError.NotFound("کاربری با این مشخصات وجود ندارد");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد وارد شده صحیح نیست!");

      const now = Date.now();

      if (+user.otp.expirsIn < now)
        throw createHttpError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await SignAccessToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //ساخت رفرش توکن
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  //متد ذخیره کردن کاربر
  async saveUser(mobile, code) {
    let otp = {
      code,
      expirsIn: new Date().getTime() + 2 * 60 * 1000,
    };

    const result = await this.checkExsistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({ mobile, otp, Roles: [ROLES.USER] }));
  }

  //متد بررسی اینکه کاربر از قبل ثبت نام کرده یا نه
  async checkExsistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  //متد بروزرسانی کاربر
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );

    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
