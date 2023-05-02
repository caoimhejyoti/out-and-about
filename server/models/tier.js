const mongoose = require("mongoose");

const { Schema } = mongoose;

const tierSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: Number,
    required: true,
    trim: true,
    default: 1,
  },
  description: {
    type: String,
  },
});

const Tier = mongoose.model("Tier", tierSchema);

module.exports = Tier;
