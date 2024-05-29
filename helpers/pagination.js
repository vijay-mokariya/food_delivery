const pagination = async (model, payload) => {
    let options = payload.options || {
        page: 1, limit: 10, pagination: true
    };
    let page = options.page || 1;
    let limit = options.limit || 2;

    let populate = options.populate;
    if (!Array.isArray(options.populate)) populate = [];

    const paginations = options.pagination;
    let skip = (page - 1) * limit;
    if (paginations === false) { skip = 0; limit = 0; }


    let query = payload.query || {};

    const search = payload.search || {};
    const value = search.value;
    const keys = search.keys;

    if (search && value) {
        const $or = keys.map(key => ({ [key]: new RegExp(value, 'i') }));
        query['$or'] = $or;
    }
    return model.find(query).populate(populate).skip(skip).limit(limit);
}

module.exports = pagination








/*

{
    "options":{
        "page":2,
        "limit":5,
        "populate":[{
            "path":"ref_id"
        }]
    },
    "query":{
       "status":"Inactive",
        "amount": {
        "$gte": 200,
        "$lte": 320
        }
    },
    "search":{
        "keys":["firstName"],
        "value":"ume"
    }
}

*/