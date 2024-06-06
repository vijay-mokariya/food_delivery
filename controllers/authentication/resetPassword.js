const User = require('../../models/User');
const Token = require('../../models/Token');
const bcrypt = require('bcrypt');
const moment=require('moment');
const CustomError = require('../../utils/HttpError');

async function resetPassword(userToken, params) {
    const { password } = params;
    if (!userToken) throw new CustomError("Token Not Found", 404);

    const token = await Token.findOne({ 'userToken.token': userToken });
    if (!token) throw new CustomError('User Token not found', 404);
    if (!(token.userToken.type === 'FORGET_PASSWORD_TOKEN')) throw new CustomError('Unauthorized user', 401)

    if (moment(token.userToken.expired).isBefore(moment())) throw new CustomError("Token expired,please regenerate Token", 401);

    const user = await User.findById(token.userId);
    console.log(user);
    if (!user) throw new CustomError("User Not Found", 404);

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    user.password = hashpassword;
    await user.save();

    return {};
}

module.exports = resetPassword;









// try {
//     const token = req.query.token;
//     // const tokenData = await user.findOne({ token: token });
//     if (!token) throw new customError("Token Not Found", 404);

//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(_id);

//     if (!user) throw new customError("User Not Found", 404);

//     const password = req.body.password;
//     const salt = bcrypt.genSaltSync(10);
//     const hashpassword = bcrypt.hashSync(password, salt);

//     user.password = hashpassword;
//     user.token = null;
//     await user.save();

//     return res.status(201).json({ data: {}, statusText: "SUCCESS", message: "user password has been reset" });
// } catch (error) {
//     console.error(error);
//     next(error);
// }