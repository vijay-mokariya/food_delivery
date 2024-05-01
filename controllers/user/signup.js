const user = require('../../models/User');
const bcrypt = require('bcrypt');

const create = async (req, res, next) => {
    try {
        const newuser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            mobileNumber: req.body.mobileNumber,
            profile: req.file.filename
        });
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newuser.password, salt);
        newuser.password = hashpassword;

        const responce = await newuser.save();
        console.log("data saved");

        res.status(200).json(responce);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        //next(error);
    }
}

module.exports = create;


