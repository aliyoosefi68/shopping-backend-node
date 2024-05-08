const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: Create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */

router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *    get:
 *      tags: [Category(AdminPanel)]
 *      summary: get all parents category
 *      responses:
 *        200:
 *          description: success
 */

router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *    get:
 *      tags: [Category(AdminPanel)]
 *      summary: get all parents category
 *      parameters:
 *        - in: path
 *          name: parent
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: success
 */

router.get("/children/:parent", CategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/all:
 *    get:
 *      tags: [Category(AdminPanel)]
 *      summary: get all categories
 *      responses:
 *        200:
 *          description: success
 */
router.get("/all", CategoryController.getAllCategory);
/**
 * @swagger
 *  /admin/category/all-without-populate:
 *    get:
 *      tags: [Category(AdminPanel)]
 *      summary: get all categories
 *      responses:
 *        200:
 *          description: success
 */
router.get(
  "/all-without-populate",
  CategoryController.getAllCategoryWhithoutPopulate
);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *    delete:
 *      tags: [Category(AdminPanel)]
 *      summary: delete category
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: success
 */
router.delete("/remove/:id", CategoryController.emoveCategory);

/**
 * @swagger
 *  /admin/category/{id}:
 *    get:
 *      tags: [Category(AdminPanel)]
 *      summary: get category by id
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: success
 */
router.get("/:id", CategoryController.getCategoryById);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *    patch:
 *      tags: [Category(AdminPanel)]
 *      summary: edit category by id
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *        - in: formData
 *          name: title
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *        500:
 *          description: internal server error
 */
router.patch("/update/:id", CategoryController.editCategory);

module.exports = {
  CategoryRoutes: router,
};
