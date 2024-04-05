const category = require('../../models/Category')

const create = async (req, res) => {
    try {
        const data = req.body;
        const newCategory = new category(data);
        const responce = await newCategory.save();

        res.status(200).json(responce);
        console.log("data saved");

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

module.exports = create;