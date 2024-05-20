const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema(
  {
    firs_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    image: { type: String },
    otp: {
      type: Object,
      default: {
        code: "",
        expirsIn: 0,
      },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    Roles: { type: [String], default: ["USER"] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = {
  UserModel: mongoose.model("user", Schema),
};
