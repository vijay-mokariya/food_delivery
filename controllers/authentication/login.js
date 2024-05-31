const User = require('../../models/User');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');
const sendResetPasswordMail = require('../../helpers/nodeMailer')


async function login(req, params) {
    const { email, password } = params;

    const userData = await User.findOne({ email: email }).select("password attempt lockTime email");//here we use password because select=false
    if (!userData) throw new CustomError("User not found", 404);

    if (userData.lockTime > Date.now()) {
        throw new CustomError("Account locked. Try again in 30 seconds.", 401);
    }

    if (userData.attempt == 3) {
        userData.attempt = 0;
        userData.lockTime = "";
    }

    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
        userData.attempt++;

        if (userData.attempt >= 3) {
            userData.lockTime = Date.now() + 30000;
        }

        await userData.save();

        throw new CustomError("Invalid Password", 400);
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    req = {
        userId: userData.id
    }
    
    console.log(req);
    await sendResetPasswordMail("otpMail", { email: userData.email, otp: otp });

    const hashOtp = bcrypt.hashSync(otp, 10);

    userData.attempt = 0;
    userData.otpExpireAt = Date.now() + 240000;
    userData.otp = hashOtp;
    await userData.save();


    return {};

}

module.exports = login;









/*

1].

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');
const sendResetPasswordMail = require('../../helpers/nodeMailer')


async function login(params) {
    const { email, password } = params;

    const userData = await User.findOne({ email: email }).select("password attempt lockTime email");//here we use password because select=false
    if (!userData) throw new CustomError("User not found", 404);

    if (userData.lockTime > Date.now()) {
        throw new CustomError("Account locked. Try again in 30 seconds.", 401);
    }

    if (userData.attempt == 3) { 
        userData.attempt = 0;
        userData.lockTime = "";
        //await userData.save();
    }

    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
        userData.attempt++;

        if (userData.attempt >= 3) {
            userData.lockTime = Date.now() + 30000;
        }

        await userData.save();
    
        throw new CustomError("Invalid Password", 400);
    }

    userData.attempt = 0;
    await userData.save();
    const payload = { userId: userData._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    await sendResetPasswordMail("otpMail", { email: userData.email });

    console.log("login successfully");
    console.log(userData.email)

    return token;

}

module.exports = login;


*/


/*

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');
const sendResetPasswordMail = require('../../helpers/nodeMailer')


async function login(params) {
    const { email, password } = params;

    const userData = await User.findOne({ email: email }).select("password attempt lockTime email");//here we use password because select=false
    if (!userData) throw new CustomError("User not found", 404);

    if (userData.lockTime > Date.now()) {
        throw new CustomError("Account locked. Try again in 30 seconds.", 401);
    }

    if (userData.attempt == 3) {
        userData.attempt = 0;
        userData.lockTime = "";
    }

    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
        userData.attempt++;

        if (userData.attempt >= 3) {
            userData.lockTime = Date.now() + 30000;
        }

        await userData.save();

        throw new CustomError("Invalid Password", 400);
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const payload = { userId: userData._id };
    const token = jwt.sign(payload, process.env.JWT_OTP_SECRET);

    await sendResetPasswordMail("otpMail", { email: userData.email, otp: otp, token: token });

    const hashOtp = bcrypt.hashSync(otp, 10);

    userData.attempt = 0;
    userData.otpExpireAt = Date.now() + 240000;
    userData.otp = hashOtp;
    userData.otpToken = token;
    await userData.save();

    console.log(userData.id);

    return {};

}

module.exports = login;

*/