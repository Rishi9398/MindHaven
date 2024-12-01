const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SOS", sosSchema);
