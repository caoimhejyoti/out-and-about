const mongoose = require('mongoose');

const { Schema } = mongoose;

const tierSchema = new Schema({
    name: {
     type: String,
     required: true,
     trim: true
   },
   description: {
     type: String
   }
 });

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;