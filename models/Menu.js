const mongoose = require('mongoose');

const schema = mongoose.Schema({
    menuName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true  
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
});

const menu = mongoose.model('menu', schema);
module.exports = menu;

