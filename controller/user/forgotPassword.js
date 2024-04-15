const user = require('../../models/User');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
// const jwt = require('jsonwebtoken');



const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 587,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailOptions = {
            from: process.env.emailUser,
            to: email,
            subject: `for reset password`,
            html: '<p>Hii ' + name + ',please copy the link and <a href="http://localhost:3000/api/user/resetPassword?token=' + token + '">reset your password </a> '
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('mail has been sent:-  ', info.response);
            }
        });

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const forgot_password = async (req, res) => {
    try {
        const email = req.body.email;
        const userdata = await user.findOne({ email: email });

        if (userdata) {
            const randomString = randomstring.generate();
            // const payload = {
            //     userId: userdata._id
            // }
            // const token = jwt.sign(payload, process.env.JWT_SECRET + userdata.password)
            // console.log(token);
            const data = await user.updateOne({ email: email }, { $set: { token: randomString } });

            sendResetPasswordMail(userdata.firstName, userdata.email, randomString);

            return res.status(401).json({ success: true, msg: `Please check your inbox of mail and reset your password` });

        }
        else {
            return res.status(401).json({ error: `email doen't exits` });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = forgot_password;































// const user = require('../../models/User');
// const bcrypt = require('bcrypt');

// const forgotPassword = async (req, res) => {
//     try {
//         const { email, newPassword } = req.body;

//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(req.body.newPassword, salt);

//         let userfind = await user.findOne({ email: email });

//         if (!userfind) {
//             return res.status(401).json({ error: 'Invalid email' });
//         }
//         userfind.password = hashpassword;

//         const responce = await userfind.save();
//         res.status(200).json(responce);
//         console.log("password updated");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// module.exports = forgotPassword;

