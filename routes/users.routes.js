const express = require('express');
const { register } = require('../controllers/users.Controller');
const router = express.Router();

router.post('/register', register);
router.get('/:id');

module.exports = router;
