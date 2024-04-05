const subCategory = require('../../models/Sub_category');

const update = async (req, res) => {

    try {
        const { id } = req.params;

        const updateSubCategory = await subCategory.findByIdAndUpdate(id, req.body);

        if (!updateSubCategory) {
            return res.status(404).json({ message: "not found" });
        }

        const newSubCategory = await subCategory.findById(id);
        console.log("category updated");
        res.status(200).json(newSubCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = update;