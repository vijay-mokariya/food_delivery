const express = require('express');
const app = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../jwt');


app.post('/', require('../controller/user/signup'));
app.post('/login', require('../controller/user/login'));
app.post('/forgotPassword', require('../controller/user/forgotPassword'));
//app.post('/resetPassword', jwtAuthMiddleware, require('../controller/user/resetPassword'));
module.exports = app;