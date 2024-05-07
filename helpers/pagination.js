const pagination = async (model, payload) => {
    const options = payload.options;
    const page = options.page || 1;
    const limit = options.limit || 4;
    const paginations = options.paginations || true;
    if (!Array.isArray(options.populate)) options.populate = [];
    const populate = options.populate;

    const query = payload.query || {};


    // const search = payload?.search;
    // const keys = search?.keys;
    // if (search && Array.isArray(search.keys) && value) {
    //     const value = search?.value;
    //     const regex = new RegExp(value, 'i');

    //     var $or = [];

    //     const skip = (page - 1) * limit;
    //     $or = keys.map(key => ({ [key]: { $regex: regex } }));
    //     query['$or'] = $or;
    // }
    // query['$and'] = $and;
    return response = model.find().populate(populate);
}

module.exports = pagination