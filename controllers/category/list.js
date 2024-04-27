const categorys = require('../../models/Category');

const list = async (req, res) => {
    try {
        const category = await categorys.find().populate('ref_id');
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = list



