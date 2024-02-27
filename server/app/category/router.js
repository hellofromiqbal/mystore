const router = require('express').Router();
const categoryController = require('./controller');

router.post('/categories', categoryController.store);

module.exports = router;