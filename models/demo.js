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
    ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
});

const user = mongoose.model('demo', schema);
module.exports = user;


/*

{
"firstName": "",
"lastName": "",
"status": "",
"payment": "",
"ref_id":""
}

66177edcdd6d0d22f355be51
66177f47dd6d0d22f355be54
66178d2a98d07eaeadeb1ce1

*/
