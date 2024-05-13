const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');

const category = require('../controllers/category/create');
const categoryDelete = require('../controllers/category/delete');
const updateCategory = require('../controllers/category/update');


app.get('/', require('../controllers/category/list'));

app.post('/', validator(validations.categoryValidation), async function _category(req, res, next) {
    try {
        const data = await category(req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.put('/:id', validator(validations.categoryValidation), async function _updateCategory(req, res, next) {
    try {
        const data = await updateCategory(req.params, req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "category update successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.delete('/:id', async function _categoryDelete(req, res, next) {
    try {
        const data = await categoryDelete(req.params);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: data
        });
    } catch (error) {
        next(error)
    }
});

module.exports = app;