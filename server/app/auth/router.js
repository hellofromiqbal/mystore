const router = require('express').Router();
const authController = require('./controller');

router.post('/register', authController.store);

module.exports = router;