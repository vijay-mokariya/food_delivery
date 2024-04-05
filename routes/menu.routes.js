const express = require('express');
const app = express();

app.post('/', require('../controller/menu/create'));
app.get('/', require('../controller/menu/display'));
app.put('/:id', require('../controller/menu/update'));
app.delete('/:id', require('../controller/menu/delete'));

module.exports = app;