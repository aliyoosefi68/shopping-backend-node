const Joi = require("@hapi/joi");
const { MongoDBIdPatern } = require("../../../utils/constants");

const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمیباشد")),

  parent: Joi.string()
    .pattern(MongoDBIdPatern)
    .allow("")
    .error(new Error("شناسه ارسال شده صحیح نیست")),
});
const updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمیباشد")),
});

module.exports = {
  addCategorySchema,
  updateCategorySchema,
};
