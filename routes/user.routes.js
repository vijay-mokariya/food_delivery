const express = require('express');
const app = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../jwt');


app.post('/', require('../controller/user/signup'));
app.post('/login', require('../controller/user/login'));
app.post('/forgotPassword', require('../controller/user/forgotPassword'));
app.get('/resetPassword', require('../controller/user/resetPassword'));
app.post('/changePassword', jwtAuthMiddleware, require('../controller/user/changePassword'));
module.exports = app;