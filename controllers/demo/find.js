const Category = require('../../models/Category');
const Menu = require('../../models/Menu');
const CustomError = require('../../utils/HttpError');

async function find(params) {
    const category = await Category.findById(params).populate('menu');
    if (!category) throw new CustomError('category not found', 404)

    return category
}

module.exports = find;