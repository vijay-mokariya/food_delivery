const express = require('express');
const router = express();

// authentication.routes.js
router.use('/demo', require('./demo.routes'));
router.use('/authentications', require('./authentication.routes'));
router.use('/user', require('./user.routes'));
router.use('/category', require('./category.routes'));
router.use('/menu', require('./menu.routes'));

module.exports = router;