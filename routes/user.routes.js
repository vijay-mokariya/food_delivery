const express = require('express');
const app = express.Router();

app.post('/', require('../controller/user/create'));

module.exports = app;