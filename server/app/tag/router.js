const router = require('express').Router();
const tagController = require('./controller');

router.post('/tags', tagController.store);
router.get('/tags', tagController.index);
router.delete('/tags/:id', tagController.destroy);

module.exports = router;