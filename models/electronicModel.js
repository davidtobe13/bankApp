const mongoose = require('mongoose')
const electronicSchema = new mongoose.Schema({
    meterNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const electronicModel = mongoose.model('electronic', electronicSchema)

module.exports = electronicModel