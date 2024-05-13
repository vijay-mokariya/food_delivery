const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwt');
const validations = require('../utils/validations');
const upload = require('../helpers/imageUpload');
const validator = require('../middlewares/validator');

const updateProfile = require('../controllers/user/updateProfile');
const display = require('../controllers/user/display');

app.get('/me', jwtAuthMiddleware, async function _display(req, res, next) {
    try {
        const data = await display(req.authUser._id);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});


app.put('/updateProfile', upload.single('profile'), validator(validations.updateProfileValidation), jwtAuthMiddleware, async function _updateProfile(req, res, next) {
    try {
        const data = await updateProfile(req.authUser._id, req.file, req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "user updated successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});


module.exports = app;