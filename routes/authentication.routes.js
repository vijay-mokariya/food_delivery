const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwt');
const validations = require('../utils/validations');
const upload = require('../helpers/imageUpload');
const validator = require('../middlewares/validator');


app.post('/signup', upload.single('profile'), validator(validations.signUpValidation), require('../controllers/authentication/signup'));
app.get('/resetPassword', validator(validations.resetPasswordvalidation), require('../controllers/authentication/resetPassword'));
app.post('/login', validator(validations.loginValidation), require('../controllers/authentication/login'));
app.post('/forgotPassword', validator(validations.forgotPasswordValidation), require('../controllers/authentication/forgotPassword'));
app.post('/changePassword', validator(validations.changePasswordValidation), jwtAuthMiddleware, require('../controllers/authentication/changePassword'));


module.exports=app;