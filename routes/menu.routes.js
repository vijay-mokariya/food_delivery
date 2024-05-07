const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');


app.get('/', require('../controllers/menu/list'));
app.post('/', validator(validations.menuValidation), require('../controllers/menu/create'));
app.put('/:id', validator(validations.menuValidation), require('../controllers/menu/update'));
app.delete('/:id', require('../controllers/menu/delete'));

module.exports = app;