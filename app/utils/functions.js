const { randomInt } = require("crypto");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const redisClient = require("./intredis");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constants");

function numberRandom() {
  return randomInt(10000, 99999);
}

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId).then((res) => res);
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1h" };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطایی در سرور رخ داده است"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
      if (err) reject(createError.InternalServerError("خطای سروری"));
      await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
}

function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken = await redisClient.get(String(user?._id));
      if (!refreshToken)
        reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"));
      if (token === refreshToken) return resolve(mobile);
      reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"));
    });
  });
}

module.exports = {
  numberRandom,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
};
