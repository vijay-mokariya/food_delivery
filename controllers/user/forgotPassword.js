const user = require('../../models/User');
const randomstring = require('randomstring');
const sendResetPasswordMail = require('../../helpers/nodeMailer')

const forgot_password = async (req, res,next) => {
    try {
        const email = req.body.email;
        const userdata = await user.findOne({ email: email });

        if (userdata) {
            const randomString = randomstring.generate();
           
            const data = await user.updateOne({ email: email }, { $set: { token: randomString } });

            sendResetPasswordMail(userdata.firstName, userdata.email, randomString);

            return res.status(401).json({ success: true, msg: `Please check your inbox of mail and reset your password` });

        }
        else {
            throw new Error('Email does not exists')
        }

    } catch (error) {
        console.error(error);
       next(error);
    }
}


module.exports = forgot_password;













// const user = require('../../models/User');
// const randomstring = require('randomstring');
// const sendResetPasswordMail = require('../../helpers/nodeMailer')
// const jwt = require('jsonwebtoken');



// const forgot_password = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const userdata = await user.findOne({ email: email });
//         const id = userdata.id;
//         if (userdata) {
//             //const randomString = randomstring.generate();
//             const payload = {
//                 userId: userdata._id
//             }
//             const token = jwt.sign(payload, process.env.JWT_SECRET + userdata.password)
         
//             //const data = await user.updateOne({ email: email }, { $set: { token: randomString } });

//             sendResetPasswordMail(userdata.firstName, userdata.email, id, token);
//             return res.status(401).json({ success: true, msg: `Please check your inbox of mail and reset your password` });

//         }
//         else {
//             return res.status(401).json({ error: `email doen't exits` });

//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }


// module.exports = forgot_password;









