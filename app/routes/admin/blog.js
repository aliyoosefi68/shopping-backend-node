const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *  get:
 *      tags: [Blogs(AdminPanel)]
 *      summary: get all blogs
 *      consumer:
 *        - multipart/form-data
 *        - application/x-ww-form-data-urlencoded
 *      parameters:
 *        - in: formData
 *          name: title
 *          required: true
 *          type: string
 *        - in: formData
 *          name: text
 *          required: true
 *          type: string
 *        - in: formData
 *          name: short-text
 *          required: true
 *          type: string
 *        - in: formData
 *          name: category
 *          required: true
 *          type: string
 *        - in: formData
 *          name: image
 *          required: true
 *          type: file
 *        - in: formData
 *          name: tags
 *          example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: success
 */
router.get("/", AdminBlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *  post:
 *      tags: [Blogs(AdminPanel)]
 *      summary: create blog document
 *      responses:
 *          201:
 *              description: success
 */
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.getListOfBlogs
);
module.exports = { BlogAdminApiRoutes: router };
