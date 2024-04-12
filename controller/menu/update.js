const menu = require('../../models/Menu')

const update = async (req, res) => {

    try {
        const { id } = req.params;

        const updatemenu = await menu.findByIdAndUpdate(id, req.body);

        if (!updatemenu) {
            return res.status(404).json({ message: "not found" });
        }
        const updateMenu = await menu.findById(id);
        res.status(200).json(updateMenu);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = update
