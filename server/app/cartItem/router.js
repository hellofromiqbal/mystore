const router = require('express').Router();
const cartItemController = require('./controller');

router.post('/cart-items', cartItemController.store);

module.exports = router;