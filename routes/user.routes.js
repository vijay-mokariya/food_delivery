const express = require('express');
const app = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwt');
const validations = require('../utils/validations');
const upload = require('../helpers/imageUpload');
const validator = require('../middlewares/validator');

app.get('/me', jwtAuthMiddleware, require('../controllers/user/display'));
app.put('/updateProfile', upload.single('profile'), validator(validations.updateProfileValidation), jwtAuthMiddleware, require('../controllers/user/updateProfile'));
app.delete('/deleteUser', jwtAuthMiddleware, require('../controllers/user/deleteUser'));


module.exports = app;