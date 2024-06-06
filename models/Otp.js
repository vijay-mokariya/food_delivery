const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    otp: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
);

const Otp = mongoose.model("otp", schema);
module.exports = Otp;