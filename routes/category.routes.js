const express = require('express');
const app = express.Router();

app.get('/', require('../controller/category/display'));
app.post('/', require('../controller/category/create'));
app.put('/:id', require('../controller/category/update'));
app.delete('/:id', require('../controller/category/delete'));

module.exports = app;