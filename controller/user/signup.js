const user = require('../../models/User');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newuser = new user(data);

        // if (!/^\d{10}$/.test(data.mobile_number)) {
        //     return res.status(400).json({ error: 'Mobile Number must be exactly 10 digits' });
        // }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newuser.password, salt);
        newuser.password = hashpassword;

        const responce = await newuser.save();
        console.log("data saved");

        res.status(200).json(responce);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

module.exports = create;