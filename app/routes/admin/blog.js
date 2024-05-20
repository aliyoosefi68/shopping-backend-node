const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *  get:
 *      tags: [Blogs(AdminPanel)]
 *      summary: get all blogs
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */
router.get("/", AdminBlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blogs(AdminPanel)]
 *          summary: Create new blog title
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAxNjcxMjIxOSIsImlhdCI6MTcxNTc1ODAyNiwiZXhwIjoxNzE1NzYxNjI2fQ.5k44vJfjBnaJGlZJJ2qusOD70WauonWqi7RiwhU0yi8
 *                  example : Bearer token...
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: text
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: short_text
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: category
 *              -   in: formData
 *                  type: file
 *                  required: true
 *                  name: image
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  name: tags
 *          responses:
 *              201:
 *                  description: success
 */
router.post(
  "/add",
  uploadFile.single("image"),
  VerifyAccessToken,
  stringToArray("tags"),
  AdminBlogController.createBlog
);
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blogs(AdminPanel)]
 *          summary: update blog document by id
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAxNjcxMjIxOSIsImlhdCI6MTcxNjE5NjMzNCwiZXhwIjoxNzQ3NzUzOTM0fQ.TVFoun4tWPzznJwFojYvyjSmpQXJ6ISbXXOlvF3LdSU
 *                  example : Bearer token...
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *              -   in: formData
 *                  type: string
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  name: text
 *              -   in: formData
 *                  type: string
 *                  name: short_text
 *              -   in: formData
 *                  type: string
 *                  name: category
 *              -   in: formData
 *                  type: file
 *                  name: image
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  name: tags
 *          responses:
 *              201:
 *                  description: success
 */
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  VerifyAccessToken,
  stringToArray("tags"),
  AdminBlogController.UpdateBlogById
);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *  get:
 *      tags: [Blogs(AdminPanel)]
 *      summary: get blog b id
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */

router.get("/:id", AdminBlogController.getOneBlogById);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *  delete:
 *      tags: [Blogs(AdminPanel)]
 *      summary: delete blog by id
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: strings
 *              required: true
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */

router.delete("/:id", AdminBlogController.deletBlogById);
module.exports = { BlogAdminApiRoutes: router };
