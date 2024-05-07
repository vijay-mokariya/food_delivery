const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');


app.get('/', require('../controllers/category/list'));
app.post('/', validations.categoryValidation, validator(validations.updateProfileValidation), require('../controllers/category/create'));
app.put('/:id', validations.categoryValidation, validator(validations.updateProfileValidation), require('../controllers/category/update'));
app.delete('/:id', require('../controllers/category/delete'));

module.exports = app;