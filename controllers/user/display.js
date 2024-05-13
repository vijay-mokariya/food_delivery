const User = require('../../models/User');

async function display(userId) {
    const user = await User.findById(userId);// here password field not display because in our model select false

    return user;
}

module.exports = display











/*

try {
        const user = await User.findById(req.authUser._id);// here password field not display because in our model select false

        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(201).json({
            statusText: "FAIL",
            message: "request executed fail"
        });
    }



*/