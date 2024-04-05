const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    sub_category_name: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
},
    {
        timestamps: true
    }
);

const subCategory = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategory;
