const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *   -  name: Admin-panel
 *      description: action of admin(add remove edit and ...)
 *   -  name: Category(AdminPanel)
 *      description: action of admin on categories
 *   -  name: Blogs(AdminPanel)
 *      description: action of admin on Blogs
 */
router.use("/blogs", VerifyAccessToken, BlogAdminApiRoutes);
router.use("/category", CategoryRoutes);
module.exports = {
  AdminRoutes: router,
};
