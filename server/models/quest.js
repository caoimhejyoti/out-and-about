const mongoose = require("mongoose");

const { Schema } = mongoose;

const questSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  tier: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Tier",
  },
  location: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  badge: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Badge",
  },
  riddle: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Riddle",
  },
  qrCode: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "QRCode",
  },
});

const Quest = mongoose.model("Quest", questSchema);

module.exports = Quest;
