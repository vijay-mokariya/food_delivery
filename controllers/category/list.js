const Categorys = require('../../models/Category');
const pagination = require('../../helpers/pagination');


const list = async (req, res) => {
    try {
        const payload = req.body;

        const data = await pagination(Categorys, payload);

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



