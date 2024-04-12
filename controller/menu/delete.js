const menu = require('../../models/Menu')

const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menuDelete = await menu.findByIdAndDelete(id);

        if (!menuDelete) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ message: "menu deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = deleteMenu;