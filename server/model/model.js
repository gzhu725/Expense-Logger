const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    price : {
        required: true,
        type: Number
    },
    currency: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data', dataSchema)