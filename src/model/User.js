const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    firstname: {
        type: String,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
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
        min: 13,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);