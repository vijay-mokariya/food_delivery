const user = require('../../models/User');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newuser = new user(data);

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newuser.password, salt);
        newuser.password = hashpassword;

        const responce = await newuser.save();
        console.log("data saved");
        res.status(200).json(responce);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}

module.exports = create;
// const person = require('../../models/Demoperson');
// const bcrypt = require('bcrypt');

// const create = async (req, res) => {
//     try {
//         const data = req.body;

//         const newperson = new person(data);

//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(newperson.password, salt);
//         newperson.password = hashpassword;

//         const responce = await newperson.save();
//         console.log("data saved");

//         const token = generatetoken(responce.username);
//         console.log("token is:- ", token);
//         res.status(200).json({ responce: responce, token: token });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });

//     }
// }

// module.exports = create;
