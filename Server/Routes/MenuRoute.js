const express = require('express');
const router = express.Router();
const {GetAll, GetProd, FindById} = require('../Controllers/MenuController');

router.get('/All', GetAll);
router.get('/Id/:id', FindById);

module.exports = router;