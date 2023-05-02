const mongoose = require("mongoose");

const { Schema } = mongoose;

const badgeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  quest: {
    type: Schema.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
