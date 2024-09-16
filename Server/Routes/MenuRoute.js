const express = require('express');
const router = express.Router();
const {GetAll, FindById, FindByName, NewProduct, Update, Delete} = require('../Controllers/MenuController');

router.post('/New', NewProduct);
router.get('/All', GetAll);
router.get('/Id/:id', FindById);
router.get('/Name/:name', FindByName);
router.put('/Update', Update);
router.put('/Delete', Delete);

module.exports = router;