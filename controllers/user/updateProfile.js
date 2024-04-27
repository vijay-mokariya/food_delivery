const User = require('../../models/User');

const update = async (req, res, next) => {
    try {
        const user = await User.findById(req.authUser._id);

        if (!user) throw new Error('User not found!');

        const updateProfile = await User.findByIdAndUpdate(user._id, req.body, { new: true });

        if (!updateProfile) throw new Error('Failed to update profile');

        res.status(200).json(updateProfile);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = update;
