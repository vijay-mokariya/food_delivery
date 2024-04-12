const user = require('../../models/User');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../jwt')


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userFind = await user.findOne({ email: email });

        const userId = await user.findById(userFind.id);
        //console.log(userid);

        if (!userFind || !(await userFind.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or Password' });
        }
        const payload = {
            userId: userFind._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        //const token = jwt.sign({ _id: userFind._id }, process.env.JWT_SECRET)
        res.json({ token })
        console.log("login successfully")
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = login;
