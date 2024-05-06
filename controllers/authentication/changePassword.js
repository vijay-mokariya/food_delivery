const User = require('../../models/User');
const bcrypt = require('bcrypt');

const changePassword = async (req, res, next) => {

    try {
        const { oldPassword, newPassword, password_confirmation } = req.body;

        if (newPassword !== password_confirmation) throw new Error('confirm password not match')

        const user = await User.findById(req.authUser._id);
        if (!user) throw new Error('User Not Found')

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) throw new Error('Invalid Old Password')

        const salt = bcrypt.genSaltSync(10);
        const newHashedPassword = bcrypt.hashSync(newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(req.authUser._id, { $set: { password: newHashedPassword } }, { new: true });

        if (!updatedUser) throw new Error('Failed to update password')

        //return res.status(200).json({ status: "success", message: "Password changed successfully" });
        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error(error);
        next(error);
    }

};

module.exports = changePassword;
