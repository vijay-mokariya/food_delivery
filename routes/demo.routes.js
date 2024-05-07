const express = require('express');
const app = express.Router();

app.get('/', require('../controllers/demo/list'));
app.post('/', require('../controllers/demo/create'));

module.exports = app;