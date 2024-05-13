const Menu = require('../../models/Menu');
const pagination = require('../../helpers/pagination');

const list = async (req, res, next) => {
    try {
        const payload = req.body;

        const data = await pagination(Menu, payload);

        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = list















// const menu = require('../../models/Menu');

// const list = async (req, res, next) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 5;

//         const skip = (page - 1) * limit;

//         const category = await menu.find().populate('category_id', 'category -_id').skip(skip).limit(limit);
//         res.status(200).json(category);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }

// }

// module.exports = list
