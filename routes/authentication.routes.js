const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwt');
const validations = require('../utils/validations');
const upload = require('../helpers/imageUpload');
const validator = require('../middlewares/validator');

const signup = require('../controllers/authentication/signup');
const changePassword = require('../controllers/authentication/changePassword');
const forgotPassword = require('../controllers/authentication/forgotPassword');
const login = require('../controllers/authentication/login');
const resetPassword = require('../controllers/authentication/resetPassword');


app.post('/signup', upload.single("profile"), validator(validations.signUpValidation), async function _signup(req, res, next) {
    try {
        const data = await signup(req.body, req.file);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.get('/resetPassword', validator(validations.resetPasswordvalidation), async function _resetPassword(req, res, next) {
    try {
        const data = await resetPassword(req.query.token, req.body,);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: data
        });
    } catch (error) {
        next(error);
    }
});

app.post('/login', validator(validations.loginValidation), async function _login(req, res, next) {
    try {
        const data = await login(req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: " login successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.post('/forgotPassword', validator(validations.forgotPasswordValidation), async function _forgotPassword(req, res, next) {
    try {
        const data = await forgotPassword(req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: data

        });
    } catch (error) {
        next(error);
    }

});

app.post('/changePassword', validator(validations.changePasswordValidation), jwtAuthMiddleware, async function _changePassword(req, res, next) {
    try {
        const data = await changePassword(req.authUser._id, req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });

    } catch (error) {
        next(error);
    }
});

module.exports = app;
