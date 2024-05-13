const demo = require('../../models/Demo');
const pagination = require('../../helpers/pagination');

const list = async (req, res, next) => {
    try {
        const payload = req.body;

        const data = await pagination(demo, payload);

        return res.status(200).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = list