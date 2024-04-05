const category = require('../../models/Category');

const display = async (req, res) => {
    try {
        const data = await category.find();
        console.log("data display");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = display;