const categorys = require('../../models/Category')

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categorydelete = await categorys.findByIdAndDelete(id);

        if (!categorydelete) throw new Error('category not found');

        res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = deleteCategory