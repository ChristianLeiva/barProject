const express = require('express');
const router = express.Router();
const { NewCategory, GetAllCategories, UpdateCategory, DeleteCategory  } = require('../Controllers/MenuController');

router.post('/New', NewCategory);
router.get('/All', GetAllCategories);
router.put('/Update', UpdateCategory);
router.put('/Delete', DeleteCategory);

module.exports = router;