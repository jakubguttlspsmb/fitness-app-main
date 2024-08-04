const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  met: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amountOfImages: { type: Number, required: true },
  imageUrl: { type: Array, required: true },
});

module.exports = mongoose.model("Exercises", schema);
