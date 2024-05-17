const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/HttpError');

async function resetPassword(token, params) {
    const { password } = params;
    // const tokenData = await user.findOne({ token: token });
    if (!token) throw new CustomError("Token Not Found", 404);

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user) throw new CustomError("User Not Found", 404);

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);

    user.password = hashpassword;
    user.token = null;
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