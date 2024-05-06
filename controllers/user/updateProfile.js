const User = require('../../models/User');
const fs = require('fs').promises;

const update = async (req, res, next) => {
    try {
        const user = await User.findById(req.authUser._id);

        if (!user) throw new Error('User not found!');

        const updateFields = { ...req.body };

        if (req.file) {
            const url = `public/images/${user.profile}`;

            if (user.profile) {
                await fs.unlink(url)
            }

            updateFields.profile = req.file.filename;
        }

        const updateProfile = await User.findByIdAndUpdate(user._id, updateFields, { new: true });

        if (!updateProfile) throw new Error('Failed to update profile');

        //res.status(200).json(updateProfile);
        return res.status(200).json({ message: "user updated successfully" });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = update;
