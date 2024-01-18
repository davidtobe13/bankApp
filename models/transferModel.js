const mongoose = require('mongoose')
const transferSchema = new mongoose.Schema({
    rciever: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const transferModel = mongoose.model('transfer', transferSchema)

module.exports = transferModel