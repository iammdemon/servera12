const mongoose = require("mongoose");

const AdminScheme = mongoose.Schema({
    username: {
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
  DOB: {
    type: String,
  },
  Companyname: {
    type: String,
    required: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
  packages: {
    type: String,
    required: true,
  },
})

const Admin = mongoose.model("Admin", AdminScheme);

module.exports = Admin;