const mongoose = require('mongoose');

const { Schema } = mongoose;

const questSchema = new Schema({
   name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    min: 0, 
    default: null
  }

});

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;