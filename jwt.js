const jwt = require('jsonwebtoken');
const User = require('./models/User');

const jwtAuthMiddleware = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const { _id } = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(_id);

            console.log(req.user);
            req.token = token;
            next();
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "Unauthorized user" });
        }
    }
    if (!token) {
        res.status(401).json({ message: "Unauthorized user, token not found" });
    }
}

const generateToken = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET)
}

module.exports = { jwtAuthMiddleware, generateToken };
