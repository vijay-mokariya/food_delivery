const mongoose = require('mongoose');

const schema = mongoose.Schema({
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
},
    {
        timestamps: true
    }
);

const Menu = mongoose.model('menu', schema);
module.exports = Menu;