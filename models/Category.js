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
});
schema.pre('find', function () {
    this.populate('ref_id', 'category -_id');
})

const category = mongoose.model('category', schema);
module.exports = category;


