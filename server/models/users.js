const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  ip: { type: String, required: true },

});

module.exports = mongoose.model("Users", schema);
