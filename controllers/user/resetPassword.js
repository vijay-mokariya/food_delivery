const user = require('../../models/User');
const bcrypt = require('bcrypt');

const reset_password = async (req, res, next) => {
    try {
        const token = req.query.token;
        const tokenData = await user.findOne({ token: token });
        if (tokenData) {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);

            const userData = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: hashpassword, token: '' } }, { new: true });
            res.status(200).json({ msg: "user password has been reset", data: userData });
        }
        else {
            throw new Error('token expired!!')
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = reset_password;






// const user = require('../../models/User');
// const jwt = require('jsonwebtoken');

// const bcrypt = require('bcrypt');

// const reset_password = async (req, res) => {
//     try {
//         //const { userId } = jwt.verify(token, process.env.JWT_SECRET);
//         const { id: userid } = req.query;
//         const userIdString = String(userid);
//         const splitUserId = userIdString.split('?')[0];
//         const splitToken = userIdString.split('?')[1];

//         const ud = await user.findById(splitUserId);
//         //console.log(ud);

//         if (!ud) {
//             return res.status(400).json({ msg: "User not found" });
//         }

//         const password = process.env.JWT_SECRET + ud.password;

//         const { userId } = jwt.verify(splitToken, password);

//         console.log(userId)

//         const tokenData = await user.findById(userId);
//         req.authUser = tokenData;

//         if (!tokenData) {
//             return res.status(400).json({ msg: "This link has expired" });
//         }

//         const pwd = req.body.password;

//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(pwd, salt);

//         const userData = await user.findByIdAndUpdate(req.authUser._id, { $set: { password: hashpassword } }, { new: true });

//         res.status(200).json({ msg: "user password has been reset", data: userData });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// module.exports = reset_password;


