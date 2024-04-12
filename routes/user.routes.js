const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../jwt');


app.post('/signup', require('../controller/user/signup'));
app.post('/login', require('../controller/user/login'));
app.post('/forgotPassword', require('../controller/user/forgotPassword'));
app.get('/resetPassword', require('../controller/user/resetPassword'));
app.get('/me', jwtAuthMiddleware, require('../controller/user/display'));
app.put('/updateProfile', jwtAuthMiddleware, require('../controller/user/updateProfile'));
app.post('/changePassword', jwtAuthMiddleware, require('../controller/user/changePassword'));
module.exports = app;