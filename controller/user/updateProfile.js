const User = require('../../models/User');

const update = async (req, res) => {
    try {
        const user = await User.findById(req.authUser._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(user);
        const updateProfile = await User.findByIdAndUpdate(user._id, req.body, { new: true });

        if (!updateProfile) {
            return res.status(404).json({ message: "Failed to update profile" });
        }

        res.status(200).json(updateProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = update;
