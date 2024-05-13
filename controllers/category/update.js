const Categorys = require('../../models/Category');
const CustomError = require('../../utils/HttpError');

async function update(userId, params) {
    const { id } = userId;

    const updatecategory = await Categorys.findByIdAndUpdate(id, params);

    if (!updatecategory) throw new CustomError("category not found", 404);

    const updatec = await Categorys.findById(id);

    return updatec

}

module.exports = update





/*


    try {
        const { id } = req.params;

        const updatecategory = await categorys.findByIdAndUpdate(id, req.body);

        if (!updatecategory) throw new customError("category not found", 404);

        const updatec = await categorys.findById(id);
        
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "category update successfully",
            data: updatec
        });

    } catch (error) {
        console.log(error);
        next(error);
    }

*/