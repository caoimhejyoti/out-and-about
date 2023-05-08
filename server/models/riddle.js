const mongoose = require("mongoose");

const { Schema } = mongoose;

const RiddleSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
});

const Riddle = mongoose.model("Riddle", RiddleSchema);

module.exports = Riddle;
