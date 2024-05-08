const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *    name: User-Authentication
 *    description: user auth section
 */

/**
 * @swagger
 *  /user/get-otp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: login user in userpanel whith phone number
 *      description: One Time Password (OTP) login
 *      parameters:
 *        - name: mobile
 *          description: fa-IRI phone number
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: success
 *        400:
 *          description: bad Request
 *        401:
 *          description: unathorization
 *        500:
 *          description: Internal server error
 */

router.post("/get-otp", UserAuthController.getOtp);

/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: check otp value in user controller
 *      description: check otp with code mobile and expires date
 *      parameters:
 *        - name: mobile
 *          description: fa-IRI phone number
 *          in: formData
 *          required: true
 *          type: string
 *        - name: code
 *          description: random number inter sms code resive
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: success
 *        400:
 *          description: bad Request
 *        401:
 *          description: unathorization
 *        500:
 *          description: Internal server error
 */

router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *    post:
 *      tags: [User-Authentication]
 *      summary: send refresh-token for get new accessToken
 *      description: fresh Token
 *      parameters:
 *        - in: formData
 *          required: true
 *          type: string
 *          name: refreshToken
 *      responses:
 *        200:
 *          description: success
 *
 */

router.post("/refresh-token", UserAuthController.refreshToken);
module.exports = {
  UserAuthRoutes: router,
};
