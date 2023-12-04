const mongoose = require("mongoose");

const CustomReqScheme = mongoose.Schema({
    assetname: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: String,
  },
  whyneeded: {
    type: String,
  },
  aditionalinfo: {
    type: String,
  },
  reqdate: {
    type: String,
  },
  status: {
    type: String,
  },
  requsteremail:{
    type: String,

  },


})

const CustomReq = mongoose.model("CustomReq", CustomReqScheme);

module.exports = CustomReq;