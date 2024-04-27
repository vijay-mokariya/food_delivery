const express = require('express');
const app = express.Router();

app.get('/', require('../controllers/category/list'));
app.post('/', require('../controllers/category/create'));
app.put('/:id', require('../controllers/category/update'));
app.delete('/:id', require('../controllers/category/delete'));

module.exports = app;