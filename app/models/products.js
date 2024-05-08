const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  total_desc: { type: String, required: true },
  short_desc: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comments: { type: [], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: number, required: true, default: 0 },
  discount: { type: number, default: 0 },
  count: { type: number },
  type: { type: String, required: true },
  time: { type: String },
  format: { type: String },
  teacher: { type: mongoose.Types.ObjectId, required: true },
  size: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      colores: [],
      model: [],
      madeIn: "",
    },
  },
});

module.exports = {
  ProductModel: mongoose.model("product", Schema),
};
