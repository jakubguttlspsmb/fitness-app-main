const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("SaveExercises", schema);
