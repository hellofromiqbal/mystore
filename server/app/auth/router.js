const router = require('express').Router();
const authController = require('./controller');

router.post('/register', authController.store);
router.post('/login', authController.login);

module.exports = router;