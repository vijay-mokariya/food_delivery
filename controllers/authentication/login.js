const User = require('../../models/User');
const Otp = require('../../models/Otp');
const Token = require('../../models/Token');
const bcrypt = require('bcrypt');
const CustomError = require('../../utils/HttpError');
const moment = require('moment');
const sendMail = require('../../helpers/nodeMailer');

async function login(params) {
    const { email, password } = params;

    const userData = await User.findOne({ email: email }).select("password attempt lockTime email");//here we use password because select=false
    if (!userData) throw new CustomError("User not found", 404);

    if (moment(userData.lockTime).isAfter(moment())) {
        throw new CustomError("Account locked. Try again in 30 seconds.", 401);
    }

    if (userData.attempt == 3) {
        userData.attempt = 0;
        userData.lockTime = null;
    }

    const match = bcrypt.compareSync(password, userData.password);

    if (!match) {
        userData.attempt++;

        if (userData.attempt >= 3) {
            userData.lockTime = moment().add(30, 'seconds');
        }

        await userData.save();

        throw new CustomError("Invalid Password", 400);
    }


    const otp = Math.floor(1000 + Math.random() * 9000);

    console.log(otp);
    //await sendMail("otpMail", { email: userData.email, otp: otp });
    await sendMail("otpMail", { email: userData.email, otp: otp });

    const unique = crypto.randomUUID();

    userData.attempt = 0;
    await userData.save();

    await Otp.findOneAndUpdate({ userId: userData.id }, {
        userId: userData.id,
        otp: otp
    }, { upsert: true });

    await Token.findOneAndUpdate({ userId: userData.id }, {
        userId: userData.id,
        'userToken.token': unique,
        'userToken.type': '2FA_TOKEN',
        'userToken.expired': moment().add(3, 'minutes')
    }, { upsert: true, });


    return unique;
}

module.exports = login;










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




