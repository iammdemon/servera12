const mongoose = require("mongoose");

const LoginScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const Login = mongoose.model("Login", LoginScheme);

module.exports = Login;