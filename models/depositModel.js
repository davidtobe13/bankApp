const mongoose = require('mongoose')
const depositSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const depositModel = mongoose.model('deposit', depositSchema)

module.exports = depositModel