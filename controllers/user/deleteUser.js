const User = require('../../models/User');
const fs = require('fs').promises;

const deleteuser = async (req, res, next) => {
    try {
        const user = await User.findById(req.authUser._id);

        if (!user) throw new Error('User not found!');

        if (user.profile) {
            await fs.unlink(`public/images/${user.profile}`)
        }

        const deleteuser = await User.findByIdAndDelete(user._id);

        if (!deleteuser) throw new Error('user not found');

        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = deleteuser;