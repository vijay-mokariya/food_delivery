const user = require('../../models/User');
const { generateToken } = require('../../jwt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userFind = await user.findOne({ email: email });

        if (!userFind || !(await userFind.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or Password' });
        }

        const payload = {
            id: userFind.id
        }
        const token = generateToken(payload);

        res.json({ token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

module.exports = login;
