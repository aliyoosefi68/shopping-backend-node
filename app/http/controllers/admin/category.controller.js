const createHttpError = require("http-errors");
const { Categorymodel } = require("../../../models/categories");
const Controller = require("../contoller");
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../../validators/admin/category.schema");
const mongoose = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await Categorymodel.create({ title, parent });
      if (!category)
        throw createHttpError.InternalServerError("خطایی در سرور رخ داده");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async emoveCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const categoryName = category.title;

      const deleteResult = await Categorymodel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: `دسته بندی ${categoryName} با موفیت حذف شد`,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      await updateCategorySchema.validateAsync(req.body);
      const resultOfUpdate = await Categorymodel.updateOne(
        { _id: id },
        { $set: { title } }
      );
      if (resultOfUpdate.modifiedCount == 0)
        throw createHttpError.InternalServerError("بروزرسانی انجام نشد");

      return res.status(202).json({
        data: {
          statusCode: 202,
          message: "بروزرسانی دسته بندی موفقیت آمیز بود",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      // const category = await Categorymodel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);

      // const category = await Categorymodel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);
      const categories = await Categorymodel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Categorymodel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);

      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await Categorymodel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await Categorymodel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(200).json({
        data: {
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategoryWhithoutPopulate(req, res, next) {
    try {
      const categories = await Categorymodel.aggregate([
        {
          $match: {},
        },
      ]);
      return res.status(200).json({
        statusCode: 200,
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(id) {
    const category = await Categorymodel.findById(id);
    if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
