const router = require('express').Router();
const invoiceController = require('./controller');

router.post('/invoices', invoiceController.store);

module.exports = router;