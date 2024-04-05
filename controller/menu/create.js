const menu = require('../../models/Menu');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menu(data);
        const responce = await newMenu.save();

        res.status(200).json(responce);
        console.log("data saved");

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
};

module.exports = create;