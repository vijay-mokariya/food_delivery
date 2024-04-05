const express = require('express');
const app = express();

app.post('/', require('../controller/category/create'));
app.get('/', require('../controller/category/display'));
app.put('/:id', require('../controller/category/update'));
app.delete('/:id', require('../controller/category/delete'));

module.exports = app;