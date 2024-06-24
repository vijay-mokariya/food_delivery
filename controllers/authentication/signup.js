const User = require('../../models/User');
const bcrypt = require('bcrypt');

async function signup(params, image) {
    const { firstName, lastName, email, password, mobileNumber } = params;

    const hashpassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashpassword,
        mobileNumber: mobileNumber,
        profile: image.filename
    });

    let response = await newUser.save();
    return {
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        mobileNumber: response.mobileNumber,
        profile: response.profile
    }
}

module.exports = signup;













// try {
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;

//     if (password === confirmPassword) {
//         const newuser = new user({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password,
//             mobileNumber: req.body.mobileNumber,
//             profile: req.file.filename
//         });

//         const salt = bcrypt.genSaltSync(10);
//         const hashpassword = bcrypt.hashSync(newuser.password, salt);
//         newuser.password = hashpassword;

//         const responce = await newuser.save();
//         console.log("data saved");

//         //res.status(200).json(responce);
//         return res.status(200).json({ message: "user signup successfully" });

//     }
//     else {
//         throw new Error("confirm password not match")
//     }

// } catch (error) {
//     console.log(error);
//     next(error);
// }