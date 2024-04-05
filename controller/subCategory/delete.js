const subCategory = require('../../models/Sub_category');

const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSubCat = await subCategory.findByIdAndDelete(id);

        if (!deleteSubCat) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ message: "user deleted successfully" });
        console.log("data deleted")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteSubCategory;