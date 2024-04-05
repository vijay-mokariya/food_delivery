const menu = require('../../models/Menu');

const deletemenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deletemenu = await menu.findByIdAndDelete(id);
        if (!deletemenu) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ message: "user deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deletemenu;