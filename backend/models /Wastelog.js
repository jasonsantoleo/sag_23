const mongoose = require('mongoose');

const wastelogSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Wastelog = mongoose.model('Wastelog', wastelogSchema);

module.exports = Wastelog;