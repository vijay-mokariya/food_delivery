const menu = require('../../models/Menu');

const list = async (req, res) => {
    try {
        const category = await menu.find().populate('category_id', 'category -_id');
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = list





