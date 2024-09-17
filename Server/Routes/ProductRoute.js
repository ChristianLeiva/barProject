const express = require('express');
const router = express.Router();
const {NewProduct, GetAllProducts, GetProductById, UpdateProduct, DeleteProduct, GetAllNullStock} = require('../Controllers/MenuController');

router.post('/New', NewProduct);
router.get('/All', GetAllProducts);
router.get('/NullStock', GetAllNullStock);
router.get('/Id/:Id', GetProductById);
router.put('/Update', UpdateProduct);
router.put('/Delete', DeleteProduct);

module.exports = router;