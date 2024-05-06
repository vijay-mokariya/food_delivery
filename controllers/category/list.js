const categorys = require('../../models/Category');

const list = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const category = await categorys.find().populate('ref_id').skip(skip).limit(limit);
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = list



