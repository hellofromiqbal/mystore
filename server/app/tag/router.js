const router = require('express').Router();
const tagController = require('./controller');

router.post('/tags', tagController.store);

module.exports = router;