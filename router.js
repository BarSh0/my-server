const express = require('express');
const FormRouter = require('./routes/form.routes');
const UserRouter = require('./routes/users.routes');
const SerialsRouter = require('./routes/serials.routes');

const router = express.Router();

router.use('/forms', FormRouter);
router.use('/users', UserRouter);
router.use('/serials', SerialsRouter);

module.exports = router;
