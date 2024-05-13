const Joi = require("@hapi/joi");
const { MongoDBIdPatern } = require("../../../utils/constants");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان مقاله درست نمی باشد!")),
  text: Joi.string().error(new Error("متن مقاله درست نمی باشد!")),
  short_text: Joi.string().error(new Error("خلاصه مقاله درست نمی باشد!")),
  image: Joi.string().error(new Error("تصویر مقاله درست نمی باشد!")),
  tags: Joi.array()
    .min(0)
    .max(30)
    .error(new Error("برچسب مقاله درست نمی باشد!")),
  category: Joi.string()
    .pattern(MongoDBIdPatern)
    .error(new Error("دسته بندی مقاله درست نمی باشد!")),
});

module.exports = {
  createBlogSchema,
};
