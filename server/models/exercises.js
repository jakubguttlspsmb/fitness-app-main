const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  met: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl:{type: String,}
});

module.exports = mongoose.model("Exercises", schema);
