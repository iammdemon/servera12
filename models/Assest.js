

const mongoose = require("mongoose");

const AssestScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
})

const Assest = mongoose.model("Assest", AssestScheme);

module.exports = Assest;