const mongoose = require("mongoose");

const EmplyeeScheme = mongoose.Schema({
    fullname: {
        type: String,
        requird: true,
      },
  email: {
    type: String,
    required: true,
  },
 
 
  password: {
    type: String,
    required: true,
  },
  DOF: {
    type: String,
  },
})

const Emplyee = mongoose.model("Emplyee", EmplyeeScheme);

module.exports = Emplyee;