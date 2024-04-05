const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    }
);

const category=mongoose.model("category",categorySchema);
module.exports=category;