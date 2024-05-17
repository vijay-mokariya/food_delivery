const Menu = require('../../models/Menu');
const CustomError = require('../../utils/HttpError');


async function deleteMenu(params) {
    const { id } = params;
    const menuDelete = await Menu.findByIdAndDelete(id);

    if (!menuDelete) throw new CustomError("category not found", 404);

    return {};
}

module.exports = deleteMenu;













/*
try {
    const { id } = req.params;
    const menuDelete = await menu.findByIdAndDelete(id);

    if (!menuDelete) throw new customError("Menu not found", 404);

    return res.status(200).json({
        statusText: "SUCCESS",
        message: "menu deleted successfully"
    });

} catch (error) {
    console.log(error);
    next(error);
}

*/