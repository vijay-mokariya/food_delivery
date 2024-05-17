const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    profile: {
        type: String
    },
    attempt: {
        type: Number,
        default: 0
    },
    lockTime: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("user", schema);
module.exports = User;