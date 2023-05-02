const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
   _id: {
      type: String,
    },
   city: { 
    type: String,
    required: true
   },
   country: {
    type: String,
    required: true
   }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;