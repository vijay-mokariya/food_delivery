const Category = require('../../models/Category');
const Menu = require('../../models/Menu');
const CustomError = require('../../utils/HttpError');

async function find(params) {
    const category = await Category.findById(params);
    if (!category) throw new CustomError("category not found", 404);

    const menu = await Menu.find({ category_id: params });

    return {
        category: category.category,
        menu: menu
    };
}

module.exports = find;