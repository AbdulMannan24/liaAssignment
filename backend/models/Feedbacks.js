const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    category: {
        type: String,
    },
    feedback : {
        type: String,
        required: true,
    },
}, { timestamps: true})

const Feedbacks = mongoose.model('Feedbacks', feedBackSchema);
module.exports = Feedbacks;