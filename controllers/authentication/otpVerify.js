const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');

async function otpVerify(req, params) {

    const { otp } = params;

    //const { userId } = jwt.verify(token, process.env.JWT_OTP_SECRET);
    const userData = req;
    
    const userId=userData.userId

    const user = await User.findById({userId});

    console.log(user);

    if (!user) throw new CustomError("User Not Found", 404);

    //if (!(token == user.otpToken)) throw new CustomError('Token is Old', 401);

    if (user.otpExpireAt < Date.now()) throw new CustomError("OTP expired,please regenerate otp", 401);

    const match = bcrypt.compareSync(otp, user.otp);
    if (!match) throw new CustomError('OTP not matched', 401)

    user.otp = "";
    await user.save();

    const payload = { userId: user._id };
    const token2 = jwt.sign(payload, process.env.JWT_SECRET);

    return token2;
}

module.exports = otpVerify;