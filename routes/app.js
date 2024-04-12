const express = require('express');
const router = express();

router.use('/user', require('./user.routes'));
router.use('/category', require('./category.routes'));
router.use('/menu', require('./menu.routes'));

module.exports = router;