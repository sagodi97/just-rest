const mongoose = require('mongoose');


const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    mark: {
        type: mongoose.Decimal128,
        default:0
    }
});

const Subject = mongoose.model('subject', subjectSchema)
module.exports = Subject;