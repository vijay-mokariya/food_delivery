const demo = require('../../models/Demo');

const create = async (req, res) => {
    try {
        const data = req.body;
        const demoData = new demo(data);
        const response = await demoData.save();
        console.log("data saved");

        //return res.status(200).json(responce);

        res.status(200).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = create;
