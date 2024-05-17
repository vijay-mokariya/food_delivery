const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');

const category = require('../controllers/category/create');
const deleteCategory = require('../controllers/category/delete');
const updateCategory = require('../controllers/category/update');
const displayCategory = require('../controllers/category/list');

app.get('/', async function _displayCategory(req, res, next) {
    try {
        const data = await displayCategory(req.body);

        return res.status(200).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

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

app.patch('/:id', validator(validations.categoryValidation), async function _updateCategory(req, res, next) {
    try {
        const data = await updateCategory(req.params.id, req.body);
        return res.status(200).json({
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
        const data = await deleteCategory(req.params);
        return res.status(200).json({
            statusText: "SUCCESS",
            message: "category deleted successfully",
            data: data
        });
    } catch (error) {
        next(error)
    }
});

module.exports = app;