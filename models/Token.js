const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userToken: {
        token: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        expired: {
            type: Date
        }
    }
},
    {
        timestamps: true
    }
);

const Token = mongoose.model('token', schema);
module.exports = Token;

