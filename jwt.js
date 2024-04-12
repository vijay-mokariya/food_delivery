const jwt = require('jsonwebtoken');
const User = require('./models/User');

const jwtAuthMiddleware = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            if (!token) return res.status(401).json({ error: 'No Token' });
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(userId);

            req.authUser = user;
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


module.exports = jwtAuthMiddleware;




// const generateToken = (userData) => {
//     return jwt.sign({userData}, process.env.JWT_SECRET)  //error userdata ne extra curly bracket ma pass karto hato etale natu thatu
// }