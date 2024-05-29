const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category: {
        type: String,
        required: true
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
// schema.pre('find', function () {
//     this.populate('ref_id', 'category -_id');
// })

const Category = mongoose.model('category', schema);
module.exports = Category;