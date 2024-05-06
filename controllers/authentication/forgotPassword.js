const user = require('../../models/User');
//const randomstring = require('randomstring');
const jwt = require("jsonwebtoken");
const sendResetPasswordMail = require('../../helpers/nodeMailer')

const forgot_password = async (req, res, next) => {
    try {
        const email = req.body.email;
        const userdata = await user.findOne({ email: email });

        if (userdata) {
            //const randomString = randomstring.generate();
            const token = jwt.sign({ _id: userdata._id }, process.env.JWT_SECRET, {
                expiresIn: "5m",
            });

            const data = await user.updateOne({ email: email }, { $set: { token: token } });

            sendResetPasswordMail(userdata.firstName, userdata.email, token);

            return res.status(401).json({ message: "Please check your inbox of mail and reset your password" });

        }
        else {
            throw new Error('Email does not exists')
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
}


module.exports = forgot_password;

