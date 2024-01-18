const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
    },
    acctNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    pin: {
        type: String,
    },
    balance:{
        type: Number,
        default: 0
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transfer'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deposit'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'withdraw'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'airtime'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'electronic'
        },
    ],
    blacklist : {
        type: Array,
        default: [],
    }
})

const userModel  = mongoose.model('user', userSchema)

module.exports = userModel


