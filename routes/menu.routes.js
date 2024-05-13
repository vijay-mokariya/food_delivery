const express = require('express');
const app = express.Router();
const validations = require('../utils/validations');
const validator = require('../middlewares/validator');

const menu = require('../controllers/menu/create');
const menuDelete = require('../controllers/menu/delete');
const updateMenu = require('../controllers/menu/update');


app.get('/', require('../controllers/menu/list'));

app.post('/', validator(validations.menuValidation), async function _menu(req, res, next) {
    try {
        const data = await menu(req.body);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});
app.put('/:id', validator(validations.menuValidation), async function _updateMenu(req, res, next) {
    try {
        const data = await updateMenu(req.params, req.body);
        return res.status(201).json({
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
        const data = await menuDelete(req.params);
        return res.status(201).json({
            statusText: "SUCCESS",
            message: data
        });
    } catch (error) {
        next(error)
    }
});

module.exports = app;