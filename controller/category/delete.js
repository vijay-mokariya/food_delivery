const categorys = require('../../models/Category')

const deletecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categorydelete = await categorys.findByIdAndDelete(id);

        if (!categorydelete) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = deletecategory