const express = require('express');
const app = express();

app.post('/', require('../controller/subCategory/create'));
app.get('/', require('../controller/subCategory/display'));
app.put('/:id', require('../controller/subCategory/update'));
app.delete('/:id', require('../controller/subCategory/delete'));

module.exports = app;