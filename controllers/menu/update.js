const Menu = require('../../models/Menu')
const CustomError = require('../../utils/HttpError');


async function update(userId, params) {
    //const { id } = userId;

    const updateMenu = await Menu.findByIdAndUpdate(userId, params, { new: true });
    //const updatecategory = await Categorys.findByIdAndUpdate(userId, params, );
    console.log(updateMenu);

    if (!updateMenu) throw new CustomError("category not found", 404);

    return updateMenu

}

module.exports = update








/*

try {
        const { id } = req.params;

        const updatemenu = await menu.findByIdAndUpdate(id, req.body);

        if (!updatemenu) throw new customError("Menu not found", 401);

        const updateMenu = await menu.findById(id);

        return res.status(201).json({
            statusText: "SUCCESS",
            message: "menu update successfully",
            data: updateMenu
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
*/