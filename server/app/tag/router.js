const router = require('express').Router();
const tagController = require('./controller');

router.post('/tags', tagController.store);
router.get('/tags', tagController.index);

module.exports = router;