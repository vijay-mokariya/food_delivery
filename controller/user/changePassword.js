const User = require('../../models/User');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {

    try {
        const { oldPassword, newPassword, password_confirmation } = req.body;
        if (oldPassword && newPassword && password_confirmation) {
            if (newPassword !== password_confirmation) {
                return res.send({ status: "failed", message: "New Passwords do not match" });
            }
            const user = await User.findById(req.user._id)
            console.log(user);
            if (!user) {
                return res.send({ status: "failed", message: "User Not Found" });
            }
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res.send({ status: "failed", message: "Invalid Old Password" });
            }
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashedPassword } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ status: "failed", message: "Failed to update password" });
            }

            return res.status(200).json({ status: "success", message: "Password changed successfully" });

        } else {
            return res.send({ status: "failed", message: "All fields are required" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", message: "Internal server error" });
    }

};

module.exports = changePassword;