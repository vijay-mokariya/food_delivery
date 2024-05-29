const express = require('express');
const app = express.Router();
const find = require('../controllers/demo/find');

app.get('/:id', async function _find(req, res, next) {
    try {
        const data = await find(req.params.id);

        return res.status(200).json({
            statusText: "SUCCESS",
            message: "request executed successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
});

app.get('/', require('../controllers/demo/list'));
app.post('/', require('../controllers/demo/create'));

module.exports = app;