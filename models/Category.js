const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
});

categorySchema.pre('find', function () {
    this.populate('ref_id', 'category -_id');
})

const category = mongoose.model('category', categorySchema);
module.exports = category;



// virtual middleware study