const User = require('../../models/User');
const fs = require('fs').promises;
const CustomError = require('../../utils/HttpError');

async function update(userId, image, params) {
    const user = await User.findById(userId);

    if (!user) throw new CustomError("User not found!", 404);

    const updateFields = { ...params };

    if (image) {
        const url = `public/images/${user.profile}`;

        if (user.profile) {
            await fs.unlink(url)
        }

        updateFields.profile = image.filename;
    }

    const updateProfile = await User.findByIdAndUpdate(user._id, updateFields, { new: true });

    if (!updateProfile) throw new CustomError("Failed to update profile", 400);

    return updateProfile;
}

module.exports = update;








/*
try {
        const user = await User.findById(req.authUser._id);

        if (!user) throw new customError("User not found!", 404);

        const updateFields = { ...req.body };

        if (req.file) {
            const url = `public/images/${user.profile}`;

            if (user.profile) {
                await fs.unlink(url)
            }

            updateFields.profile = req.file.filename;
        }

        const updateProfile = await User.findByIdAndUpdate(user._id, updateFields, { new: true });

        if (!updateProfile) throw new customError("Failed to update profile", 400);

        return res.status(201).json({
            statusText: "SUCCESS",
            message: "user updated successfully",
            data: updateProfile
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
*/