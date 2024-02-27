const router = require('express').Router();
const authController = require('./controller');

router.post('/register', authController.store);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;