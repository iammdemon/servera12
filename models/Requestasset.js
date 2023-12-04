const mongoose = require("mongoose");

const AssetScheme = mongoose.Schema({
    name: {
        type: String,
        requird: true,
      },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },

  notes: {
    type: String,
  },
  requsteremail:{
    type: String,

  },
  requstername:{
    type: String,

  },
})

const RequestAsset = mongoose.model("RequestAsset", AssetScheme);

module.exports = RequestAsset;