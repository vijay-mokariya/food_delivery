const CustomError = require('../utils/HttpError');
const User = require('../models/User');
const Token = require('../models/Token');

const jwtAuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!(authorization && authorization.startsWith('Bearer'))) throw new CustomError('Unauthorized user, token not found', 401)
        userToken = authorization.split(' ')[1];

        const token = await Token.findOne({ 'userToken.token': userToken });
        if (!token) throw new CustomError('Token not found', 404);
        if (!(token.userToken.type === 'ACCESS_TOKEN')) throw new CustomError('Unauthorized user', 401);

        const user = await User.findOne({ _id: token.userId });
        if (!user) throw new CustomError('User not found', 404)

        req.authUser = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = jwtAuthMiddleware;





/*

1].

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



*/

/*

2]..

const CustomError = require('../utils/HttpError');
const User = require('../models/User');

const jwtAuthMiddleware = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    try {
        if (!(authorization && authorization.startsWith('Bearer'))) throw new CustomError('Unauthorized user, token not found', 401)
        token = authorization.split(' ')[1];

        const user = await User.findOne({ token: token });
        if (!user) throw new CustomError('Token not found', 404)

        req.authUser = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = jwtAuthMiddleware;


*/

// const generateToken = (userData) => {
//     return jwt.sign({userData}, process.env.JWT_SECRET)  //error userdata ne extra curly bracket ma pass karto hato etale natu thatu
// }