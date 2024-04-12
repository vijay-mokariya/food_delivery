const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    menu_name: {
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

const menu = mongoose.model('menu', menuSchema);
module.exports = menu;

