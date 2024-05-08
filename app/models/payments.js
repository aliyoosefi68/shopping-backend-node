const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({});

module.exports = {
  PaymentsModel: mongoose.model("payment", Schema),
};
