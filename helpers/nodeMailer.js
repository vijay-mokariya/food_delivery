const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendMail = async (formatName, data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ionos.com',
            port: 587,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

       // const template = await ejs.renderFile('views/' + formatName + '.ejs', { data });
        const template = await ejs.renderFile(`views/${formatName}.ejs`, { data });

        const mailOptions = {
            from: process.env.emailUser,
            to: data.email,
            subject: `for reset password`,
            html: template
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('mail has been sent:-  ', info.response);
        return;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = sendMail;




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
