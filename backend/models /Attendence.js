const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

module.exports = Attendence;