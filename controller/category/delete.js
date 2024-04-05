const category = require('../../models/Category')

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletecat = await category.findByIdAndDelete(id);
        if (!deletecat) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ message: "user deleted successfully" });
        console.log("data deleted")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteCategory;