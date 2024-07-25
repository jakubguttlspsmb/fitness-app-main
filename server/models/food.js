const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  kcal: { type: Number, required: true },
  bil: { type: Number, required: true },
  sach: { type: Number, required: true },
  tuk: { type: Number, required: true },
});

module.exports = mongoose.model("Food", schema);
