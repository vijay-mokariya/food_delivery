const nodemailer = require('nodemailer');

const sendResetPasswordMail = async (name, email, token) => {
    return new Promise((resolve, reject) => {
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
                html: '<p>Hii ' + name + ',please copy the link and <a href="http://localhost:4000/api/v1/authentication/resetPassword?token=' + token + '">reset your password </a> '
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error); 
                } else {
                    console.log('mail has been sent:-  ', info.response);
                    resolve(); 
                }
            });
        } catch (error) {
            console.error(error);
            reject(error); 
        }
    });
}
module.exports = sendResetPasswordMail;







// const nodemailer = require('nodemailer');

// const sendResetPasswordMail = async (name, email, id, token) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.ionos.com',
//             port: 587,
//             auth: {
//                 user: process.env.emailUser,
//                 pass: process.env.emailPassword
//             }
//         });

//         const mailOptions = {
//             from: process.env.emailUser,
//             to: email,
//             subject: `for reset password`,
//             html: '<p>Hii ' + name + ',please copy the link and <a href="http://localhost:4000/api/v1/user/resetPassword?id=' + id + '?' + token + '">reset your password </a> '
//         }

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             }
//             else {
//                 console.log('mail has been sent:-  ', info.response);
//             }
//         });

//     } catch (error) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// module.exports = sendResetPasswordMail;





/*
https://youtu.be/RYEeg6IhzvE?si=4t3hXv2s2qS3zFww
*/