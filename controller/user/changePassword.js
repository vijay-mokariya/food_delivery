const User = require('../../models/User');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, password_confirmation } = req.body;
        if (oldPassword && newPassword && password_confirmation) {
            if (newPassword !== password_confirmation) {
                return res.send({ status: "failed", message: "New Passwords do not match" });
            }
            const user = await User.findOne(req.user._id);
            if (!user) {
                return res.send({ status: "failed", message: "User Not Found" });
            }
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res.send({ status: "failed", message: "Invalid Old Password" });
            }
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = newHashedPassword;
            await user.save();
            return res.send({ status: "success", message: "Password Changed Successfully" });
        } else {
            return res.send({ status: "failed", message: "All Fields Are Required" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}

module.exports = changePassword;























// const user = require('../../models/User');
// const bcrypt = require('bcrypt');

// const resetPassword = async (req, res) => {
//     try {
//         const { oldPassword, newPassword } = req.body;

//         // Check if oldPassword and newPassword are provided
//         if (!oldPassword || !newPassword) {
//             return res.status(400).json({ error: 'Please provide oldPassword and newPassword' });
//         }

//         // Find user by id or any other unique identifier
//         const user = await User.findOne({ _id: req.user._id }); // Assuming you're using some form of authentication middleware that attaches the user object to the request (req.user)

//         // If user is not found
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Verify old password
//         const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid password' });
//         }

//         // Generate hash for new password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);

//         // Update user's password
//         user.password = hashedPassword;

//         // Save updated user object
//         await user.save();

//         // Send success response
//         res.status(200).json({ message: 'Password reset successfully' });
//         console.log('Password reset successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// module.exports = resetPassword;


