const express = require('express');
const app = express.Router();

app.post('/', require('../controller/user/create'));
app.post('/login', require('../controller/user/login'));

module.exports = app;