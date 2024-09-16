const express = require('express');
const router = express.Router();
const {GetAll, GetProd, FindById, FindByName, NewProduct} = require('../Controllers/MenuController');

router.post('/New', NewProduct);
router.get('/All', GetAll);
router.get('/Id/:id', FindById);
router.get('/Name/:name', FindByName);

module.exports = router;