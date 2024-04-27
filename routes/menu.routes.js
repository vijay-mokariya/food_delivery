const express = require('express');
const app = express.Router();

app.get('/', require('../controllers/menu/list'));
app.post('/', require('../controllers/menu/create'));
app.put('/:id', require('../controllers/menu/update'));
app.delete('/:id', require('../controllers/menu/delete'));

module.exports = app;