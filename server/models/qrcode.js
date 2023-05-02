const mongoose = require("mongoose");

const { Schema } = mongoose;

const QRCodeSchema = new Schema({
  _id: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  quest: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Quest",
  },
});

const QRCode = mongoose.model("QRCode", QRCodeSchema);

module.exports = QRCode;
