const user = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFind = await user.findOne({ email: email });
        if (!(await userFind.email)) throw new Error('User not Found!')

        const match = await bcrypt.compare(password, userFind.password);
        if (!match) throw new Error('Invalid Password')
 
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

