const Categorys = require('../../models/Category');
const CustomError = require('../../utils/HttpError');

async function deleteCategory(params){
    const { id } = params;
    const categoryDelete = await Categorys.findByIdAndDelete(id);

    if (!categoryDelete) throw new CustomError("category not found", 404);

    return "category deleted successfully";
}

module.exports = deleteCategory






/*
try {
        const { id } = req.params;
        const categorydelete = await categorys.findByIdAndDelete(id);

        if (!categorydelete) throw new customError("category not found", 404);


        return res.status(200).json({
            statusText: "SUCCESS",
            message: "category deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }


*/