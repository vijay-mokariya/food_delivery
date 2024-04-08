const user = require('../../models/User');
const bcrypt = require('bcrypt');

const reset_password = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await user.findOne({ token: token });
        if (tokenData) {
            const password = req.body.password;

            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            //password = hashpassword;
            const userData = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: hashpassword, token: '' } }, { new: true });
            res.status(200).json({ msg: "user password has been reset", data: userData });

        }
        else {
            res.status(200).json({ msg: "this link has been expired" });

        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = reset_password; 