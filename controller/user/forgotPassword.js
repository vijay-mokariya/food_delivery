const user = require('../../models/User');
const bcrypt = require('bcrypt');

const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.newPassword, salt);

        let userfind = await user.findOne({ email: email });

        if (!userfind) {
            return res.status(401).json({ error: 'Invalid email' });
        }
        userfind.password = hashpassword;

        const responce = await userfind.save();
        res.status(200).json(responce);
        console.log("password updated");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = forgotPassword;

