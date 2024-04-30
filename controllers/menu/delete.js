const menu = require('../../models/Menu')

const deleteMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const menuDelete = await menu.findByIdAndDelete(id);

        if (!menuDelete) throw new Error('Menu not found')

        res.status(200).json({ message: "menu deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = deleteMenu;