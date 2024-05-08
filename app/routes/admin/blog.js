const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *  get:
 *      tags: [Blogs(AdminPanel)]
 *      summary: get all blogs
 *      responses:
 *          200:
 *              description: success
 */
router.get("/", AdminBlogController.getListOfBlogs);
module.exports = { BlogAdminApiRoutes: router };
