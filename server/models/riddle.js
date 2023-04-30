const mongoose = require('mongoose');

const { Schema } = mongoose;

const RiddleSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    quest: {
        type: Schema.Types.ObjectId,
        ref: 'Quest',
        required: true
    }
 });

const Riddle = mongoose.model('Riddle', RiddleSchema);

module.exports = Riddle;