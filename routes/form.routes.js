const express = require('express');
const { validateSerialNumber } = require('../controllers/validation.Controller');
const router = express.Router();

router.post('/validate-sn', validateSerialNumber);

module.exports = router;
