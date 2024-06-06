const Otp = require('../../models/Otp');
const Token = require('../../models/Token');
const CustomError = require('../../utils/HttpError');
const moment = require('moment');

async function otpVerify(authorization, params) {
    const { otp } = params;

    if (!(authorization && authorization.startsWith('Bearer'))) throw new CustomError('Unauthorized user, token not found', 401)
    const authorizationId = authorization.split(' ')[1];

    const userToken = await Token.findOne({ 'userToken.token': authorizationId });
    if (!userToken) throw new CustomError('User Token not found', 404);
    if (!(userToken.userToken.type === '2FA_TOKEN')) throw new CustomError('Unauthorized user', 401)

    const userOtp = await Otp.findOne({ userId: userToken.userId });
    if (!userOtp) throw new CustomError("OTP Not Found", 404);

    if (moment(userToken.userToken.expired).isBefore(moment())) throw new CustomError("OTP expired,please regenerate otp", 401);

    if (otp == userOtp.otp) {

        let token = crypto.randomUUID();

        await Token.findOneAndUpdate({ userId: userOtp.userId }, {
            userId: userOtp.userId,
            'userToken.token': token,
            'userToken.type': 'ACCESS_TOKEN'
        }, { upsert: true });

        await userOtp.deleteOne();

        return token;
    }
    throw new CustomError('OTP not matched', 401);

}

module.exports = otpVerify;



/*

const Otp = require('../../models/Otp');
const CustomError = require('../../utils/HttpError');
const jwt = require('jsonwebtoken');
const moment = require('moment');

async function otpVerify(params) {
    const { otp, sessionId } = params;

    const userOtp = await Otp.findOne({ sessionId: sessionId });

    if (!userOtp) throw new CustomError("OTP Not Found", 404);

    if (moment(userOtp.otpExpireAt).isBefore(moment())) throw new CustomError("OTP expired,please regenerate otp", 401);

    if (otp == userOtp.otp) {
        await userOtp.deleteOne();

        const payload = { userId: userOtp.userId };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }
    throw new CustomError('OTP not matched', 401);

}

module.exports = otpVerify;

*/





/*
2]..

const Otp = require('../../models/Otp');
const Token = require('../../models/Token');
const CustomError = require('../../utils/HttpError');
const moment = require('moment');

async function otpVerify(params) {
    const { otp, sessionId } = params;

    const userOtp = await Otp.findOne({ sessionId: sessionId });// Token mathi find karvani
    if (!userOtp) throw new CustomError("OTP Not Found", 404);

    if (moment(userOtp.otpExpireAt).isBefore(moment())) throw new CustomError("OTP expired,please regenerate otp", 401);

    if (otp == userOtp.otp) {

        let token = crypto.randomUUID();

        await Token.findOneAndUpdate({ userId: userOtp.userId }, {
            userId: userOtp.userId,
            'token.token': token,
            'token.type': 'ACCESS_TOKEN'
        }, { upsert: true });

        await userOtp.deleteOne();

        return token;
    }
    throw new CustomError('OTP not matched', 401);

}

module.exports = otpVerify;

*/