const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwt');
const validations = require('../utils/validations');
const upload = require('../helpers/imageUpload');
const validator = require('../middlewares/validator');

// validator
app.post('/signup', upload.single('profile'), validations.signUpValidation, validator, require('../controllers/user/signup'));
app.post('/login', validations.loginValidation, validator, require('../controllers/user/login'));
app.post('/forgotPassword', validations.forgotPasswordValidation, validator, require('../controllers/user/forgotPassword'));
app.get('/resetPassword', validations.resetPasswordvalidation, validator, require('../controllers/user/resetPassword'));
app.get('/me', jwtAuthMiddleware, require('../controllers/user/display'));
app.put('/updateProfile', validations.updateProfileValidation, validator, jwtAuthMiddleware, require('../controllers/user/updateProfile'));
app.post('/changePassword', validations.changePasswordValidation, validator, jwtAuthMiddleware, require('../controllers/user/changePassword'));
module.exports = app;