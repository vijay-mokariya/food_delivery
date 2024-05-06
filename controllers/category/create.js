const categorys = require('../../models/Category');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newcategory = new categorys(data);
        const responce = await newcategory.save();
        console.log("data saved");
        
        //return res.status(200).json(responce);

        return res.status(200).json({ message: "category insert successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = create;
