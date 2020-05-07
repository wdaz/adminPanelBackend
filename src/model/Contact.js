const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    firstname: {
        type: String,        
        required: true,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    country: {
        type: String,
        min: 3,
        max: 255
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 13,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contact', contactSchema);