const menu = require('../../models/Menu')

const update = async (req, res, next) => {

    try {
        const { id } = req.params;

        const updatemenu = await menu.findByIdAndUpdate(id, req.body);

        if (!updatemenu) throw new Error('Menu not found');

        const updateMenu = await menu.findById(id);
       //res.status(200).json(updateMenu);
        return res.status(200).json({ message: "menu update successfully" });


    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = update