const menu = require('../../models/Menu');

const create = async (req, res,next) => {
    try {
        const data = req.body;
        const newMenu = new menu(data);

        const responce = await newMenu.save();
        console.log("data saved");

        return res.status(200).json(responce);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = create;