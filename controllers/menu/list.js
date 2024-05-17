const Menu = require('../../models/Menu');
const pagination = require('../../helpers/pagination');

async function list(params){

    const data = await pagination(Menu, params);

    return data;
}

module.exports = list








/*

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


*/