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
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    payment: {
        type: String,
        enum: ['Success', 'Fail'],
        default: 'Fail'
    },
    amount: {
        type: Number
    },
    ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('demo', schema);
module.exports = User;



