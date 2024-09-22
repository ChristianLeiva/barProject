const express = require('express');
const router = express.Router();
const {getAllRoles, getRolByDescription, createRole, updateRole, deleteRole} = require('../Controllers/RoleController');

router.post('/New', createRole);
router.get('/All/', getAllRoles);
router.get('/Name/:description', getRolByDescription);
router.put('/Update', updateRole);
router.put('/Delete', deleteRole);

module.exports = router;