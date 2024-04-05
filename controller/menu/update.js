const menu = require('../../models/Menu');

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateMenu = await menu.findByIdAndUpdate(id, req.body);
        if (!updateMenu) {
            return res.status(404).json({ message: "not found" });
        }
        const newMenu = await menu.findById(id);
        console.log("menu updated");
        res.status(200).json(newMenu);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = update;