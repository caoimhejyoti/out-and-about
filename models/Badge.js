const mongoose = require('mongoose');

const { Schema } = mongoose;

const badgeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: { 
        type: String,
    },
    quantity: { 
        type: Number,
        min: 0, 
        default: null
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Quest',
        required: true
    }
});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;