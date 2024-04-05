const category = require('../../models/Category');

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateCategory = await category.findByIdAndUpdate(id, req.body);

        if (!updateCategory) {
            return res.status(404).json({ message: "not found" });
        }
        const newCategory = await category.findById(id);
        console.log("category updated");
        res.status(200).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = update;