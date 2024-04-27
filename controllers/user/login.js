const user = require('../../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFind = await user.findOne({ email: email });
        if (!(await userFind.email)) throw new Error('User not Found!')

        if (!(await userFind.comparePassword(password))) throw new Error('Password not correct ')

        const payload = {
            userId: userFind._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ token })
        console.log("login successfully")

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = login;

