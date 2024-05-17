const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');

const createMenu = require('../controllers/menu/create');
const deleteMenu = require('../controllers/menu/delete');
const updateMenu = require('../controllers/menu/update');
const displayMenu = require('../controllers/menu/list');

app.get('/', async function _displayMenu(req, res, next) {
    try {
        const data = await displayMenu(req.body);
       //return res.render('index',{data});
        return res.status(200).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.post('/', validator(validations.menuValidation), async function _menu(req, res, next) {
    try {
        const data = await createMenu(req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.patch('/:id', validator(validations.menuValidation), async function _updateMenu(req, res, next) {
    try {
        const data = await updateMenu(req.params.id, req.body);
        return res.status(200).json({
            statusText: "SUCCESS",
            message: "menu update successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.delete('/:id', async function _menuDelete(req, res, next) {
    try {
        const data = await deleteMenu(req.params);
        return res.status(200).json({
            statusText: "SUCCESS",
            message: "menu deleted successfully",
            data: data
        });
    } catch (error) {
        next(error)
    }
});

module.exports = app;