const User = require('../../models/User');

const display = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('username email mobile_number');
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = display





