const categorys = require('../../models/Category')

const update = async (req, res, next) => {

    try {
        const { id } = req.params;

        const updatecategory = await categorys.findByIdAndUpdate(id, req.body);

        if (!updatecategory) throw new Error('category not found');

        const updatec = await categorys.findById(id);
        // res.status(200).json(updatec);
        return res.status(200).json({ message: "category update successfully" });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = update
