const User = require('../../models/User');

const display = async (req, res) => {
    try {
        const user = await User.findById(req.authUser._id).select('firstName lastName email mobileNumber profile -_id');
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = display