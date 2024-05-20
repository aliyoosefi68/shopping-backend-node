const createHttpError = require("http-errors");
const { Blogmodel } = require("../../../models/blogs");
const { deletFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../contoller");
const path = require("path");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, category, tags } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await Blogmodel.create({
        title,
        image,
        text,
        short_text,
        category,
        tags,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "ایجاد بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deletFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await Blogmodel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "author.Roles": 0,
            "author.otp": 0,
            "author.bills": 0,
            "author.discount": 0,
            "author.__v": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
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
      const { id } = req.params;
      const blog = await this.findBlog(id);
      const result = await Blogmodel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw createHttpError.InternalServerError(
          "خطای سرور .حذف مقاله انجام نشد!"
        );
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف مقاله با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async UpdateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);

      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackListFieldes = [
        "bookmark",
        "dislike",
        "like",
        "comments",
        "author",
        "0",
        0,
        null,
        undefined,
      ];
      Object.keys(data).forEach((key) => {
        if (blackListFieldes.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });

      //   Object.keys(data).forEach(key => {
      //     if(blackListFields.includes(key)) delete data[key]
      //     if(typeof data[key] == "string") data[key] = data[key].trim();
      //     if(Array.isArray(data[key]) && data[key].length > 0 ) data[key] = data[key].map(item => item.trim())
      //     if(nullishData.includes(data[key])) delete data[key];
      // })

      const updateResult = await Blogmodel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("بروززسانی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروزرسانی بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deletFileInPublic(req?.body?.image);
      next(error);
    }
  }

  async findBlog(id) {
    const blog = await Blogmodel.findById(id).populate([
      { path: "category", select: ["title"] },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);

    if (!blog) throw createHttpError.NotFound("مقاله مورد نظر وجود ندارد");

    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
