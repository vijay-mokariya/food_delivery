const user = require('../../models/User');
const bcrypt = require('bcrypt');

const create = async (req, res, next) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password === confirmPassword) {
            const newuser = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                mobileNumber: req.body.mobileNumber,
                profile: req.file.filename
            });

            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(newuser.password, salt);
            newuser.password = hashpassword;

            const responce = await newuser.save();
            console.log("data saved");

            //res.status(200).json(responce);
            return res.status(200).json({ message: "user signup successfully" });

        }
        else {
            throw new Error("confirm password not match")
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = create;



// hello
// good morning
// i make a flow of your given task
// can i discuss with you it's right or wrong?