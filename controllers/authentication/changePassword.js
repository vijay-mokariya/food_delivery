const User = require('../../models/User');
const CustomError = require('../../utils/HttpError');
const bcrypt = require('bcrypt');

async function changePassword(userId,params){
    const { oldPassword, newPassword } = params;

    const userData = await User.findById(userId).select("password");
    
    const match = bcrypt.compareSync(oldPassword, userData.password);
    if (!match) throw new CustomError('Invalid Old Password', 401);

    //const salt = bcrypt.genSaltSync(10);
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);

    userData.password = newHashedPassword;
    const updatedUser = await userData.save();
    
    if (!updatedUser) throw new CustomError('Failed to update password', 400);
    
    return {};
}

module.exports = changePassword;




// try {
//     const { oldPassword, newPassword } = req.body;

//     const user = await User.findById(req.authUser._id).select("password");
//     if (!user) throw new customError('User not found', 401)
//     const match = bcrypt.compareSync(oldPassword, user.password);
//     if (!match) throw new customError('Invalid Old Password', 401)

//     //const salt = bcrypt.genSaltSync(10);
//     const newHashedPassword = bcrypt.hashSync(newPassword, 10);

//     user.password = newHashedPassword;
//     const updatedUser = await user.save();
    
//     if (!updatedUser) throw new customError('Failed to update password', 400)

//     return res.status(201).json({
//         statusText: "SUCCESS",
//         message: "request executed successfully"
//     });

// } catch (error) {
//     console.error(error);
//     next(error);
// }