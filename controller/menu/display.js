const menu = require('../../models/Menu');

const display = async (req, res) => {
    try {
        const data = await menu.find().populate('subCaegory', 'sub_category_name -_id');
        console.log("data display");
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = display;