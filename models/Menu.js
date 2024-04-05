const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    foodName: {
        type: String,
        require: true
    },
    foodDetail: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    subCaegory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    }
},
    {
        timestamps: true
    }
);

const menu = mongoose.model("menu", menuSchema);
module.exports = menu;

