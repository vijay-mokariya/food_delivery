const User = require('../../models/User');
//const randomstring = require('randomstring');
const CustomError = require('../../utils/HttpError');
const jwt = require("jsonwebtoken");
const sendResetPasswordMail = require('../../helpers/nodeMailer')

async function forgotPassword(params) {
    const { email } = params
    const userData = await User.findOne({ email: email });

    if (!userData) throw new CustomError('Email does not exists', 404);

    //const randomString = randomstring.generate();
    const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
    });

    userData.token = token;
    userData.save();
    //const data = await user.updateOne({ email: email }, { $set: { token: token } });

    sendResetPasswordMail(userData.firstName, userData.email, token);

    return "Please check your inbox of mail and reset your password";
}

module.exports = forgotPassword;






// try {
//     const email = req.body.email;
//     const userdata = await user.findOne({ email: email });

//     if (!userdata) throw new customError('Email does not exists', 404);

//     //const randomString = randomstring.generate();
//     const token = jwt.sign({ _id: userdata._id }, process.env.JWT_SECRET, {
//         expiresIn: "5m",
//     });

//     userdata.token = token;
//     userdata.save();
//     //const data = await user.updateOne({ email: email }, { $set: { token: token } });

//     sendResetPasswordMail(userdata.firstName, userdata.email, token);

//     return res.status(201).json({
//         statusText: "SUCCESS",
//         message: "Please check your inbox of mail and reset your password"
//     });

// } catch (error) {
//     console.error(error);
//     next(error);
// }