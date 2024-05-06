const pagination = async (model, payload) => {
    const option = payload.option;
    const page = option.page || 1;
    const limit = option.limit || 4;
    paginations = option.paginations || "true";
    const populate = option.populate || {};

    const skip = (page - 1) * limit

    if (paginations === "true") {
        return model.find().populate(populate).skip(skip).limit(limit);
    }
    else {
        return response = model.find();
    } 

    //return model.find().skip(skip).limit(limit);

}

module.exports = pagination


