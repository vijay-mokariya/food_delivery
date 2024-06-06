const User = require('../../models/User');
const Token = require('../../models/Token');
const CustomError = require('../../utils/HttpError');
const moment = require('moment');
const sendMail = require('../../helpers/nodeMailer');

async function forgotPassword(params) {
    const { email } = params
    const userData = await User.findOne({ email: email });

    if (!userData) throw new CustomError('Email does not exists', 404);

    const token = crypto.randomUUID();

    await Token.findOneAndUpdate({ userId: userData.id }, {
        userId: userData.id,
        'userToken.token': token,
        'userToken.type': 'FORGET_PASSWORD_TOKEN',
        'userToken.expired': moment().add(3, 'minutes')
    }, { upsert: true });

    console.log(token);
    await sendMail("forgotPasswor", { name: userData.firstName, email: userData.email, token: token });

    return {};
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