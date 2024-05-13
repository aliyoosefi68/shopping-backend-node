const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../contoller");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = createBlogSchema.validateAsync(req.body);
      return res.json({ blogDataBody });
    } catch (error) {
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      return res.status(200).json({
        statusCode: 200,
        data: {
          blogs: [],
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deletBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async UpdateBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
