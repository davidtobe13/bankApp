const mongoose = require('mongoose')
const withdrawSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const withdrawModel = mongoose.model('withdraw', withdrawSchema)

module.exports = withdrawModel