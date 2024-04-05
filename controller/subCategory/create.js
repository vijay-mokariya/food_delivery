const subCategory = require('../../models/Sub_category');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newSubCategory = new subCategory(data);
        const responce = await newSubCategory.save();
        console.log("data save");
        res.status(200).json(responce);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = create;