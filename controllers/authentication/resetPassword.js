const user = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const reset_password = async (req, res, next) => {
    try {
        const token = req.query.token;
        // const tokenData = await user.findOne({ token: token });
        if (token) {
            const { _id } = jwt.verify(token, process.env.JWT_SECRET);
            const User = await user.findById(_id);

            if (!User) throw new Error("user not found!");

            const password = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password, salt);

            const userData = await user.findByIdAndUpdate(User._id, { $set: { password: hashpassword, token: '' } }, { new: true });
            //res.status(200).json({ msg: "user password has been reset", data: userData });
            return res.status(200).json({ message: "user password has been reset" });

        }
        else {
            throw new Error('token expired!!')
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = reset_password;


