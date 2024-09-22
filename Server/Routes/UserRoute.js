const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByName, getUserById, updateUser, createUser, deleteuser } = require('../Controllers/UserController');

router.post('/New', createUser);
router.get('/All/', getAllUsers);
router.get('/Name/:name', getUserByName);
router.get('/Id/:id', getUserById);
router.put('/Update', updateUser);
router.put('/Delete', deleteuser);

module.exports = router;