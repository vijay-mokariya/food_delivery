const categorys = require('../../models/Category')

const update = async (req, res) => {

    try {
        const { id } = req.params;

        const updatecategory = await categorys.findByIdAndUpdate(id, req.body);

        if (!updatecategory) {
            return res.status(404).json({ message: "not found" });
        }
        const updatec = await categorys.findById(id);
        res.status(200).json(updatec);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = update
