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
    { toJSON: { virtuals: true } },
    {
        timestamps: true
    }
);
schema.virtual('menu', {
    ref: 'menu',
    localField: '_id',
    foreignField: 'category_id'
});


// schema.pre('find', function () {
//     this.populate('ref_id', 'category -_id');
// })

const Category = mongoose.model('category', schema);
module.exports = Category;