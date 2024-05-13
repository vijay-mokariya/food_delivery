const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');

async function login(params) {
    const { email, password } = params;

    const userData = await User.findOne({ email: email }).select("password");//here we use password because select=false
    if (!userData) throw new CustomError("User not found", 404);

    const match = await bcrypt.compare(password, userData.password);
    if (!match) throw new CustomError("Invalid Password", 400);

    const payload = { userId: userData._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    console.log("login successfully")
    return token;

}

module.exports = login;








// try {
//     const { email, password } = req.body;

//     const userFind = await user.findOne({ email: email }).select("password");//here we use password because select=false
//     if (!userFind) throw new customError("User not found", 404);

//     const match = await bcrypt.compare(password, userFind.password);
//     if (!match) throw new customError("Invalid Password", 400);

//     const payload = { userId: userFind._id };

//     const token = jwt.sign(payload, process.env.JWT_SECRET)

//     console.log("login successfully")
//     return res.status(201).json({
//         statusText: "SUCCESS",
//         message: "request executed successfully",
//         data: token
//     });


// } catch (error) {
//     console.log(error);
//     next(error);
// }