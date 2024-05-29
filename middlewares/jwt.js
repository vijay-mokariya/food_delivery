const jwt = require('jsonwebtoken');
const CustomError = require('../utils/HttpError');
const User = require('../models/User');

const jwtAuthMiddleware = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    try {
        if (!(authorization && authorization.startsWith('Bearer'))) throw new CustomError('Unauthorized user, token not found', 401)
        token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        req.authUser = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = jwtAuthMiddleware;




// const generateToken = (userData) => {
//     return jwt.sign({userData}, process.env.JWT_SECRET)  //error userdata ne extra curly bracket ma pass karto hato etale natu thatu
// }