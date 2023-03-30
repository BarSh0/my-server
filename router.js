const express = require('express');
const cors = require('cors');
const FormRouter = require('./routes/form.routes');
const UserRouter = require('./routes/users.routes');
const SerialsRouter = require('./routes/serials.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/forms', FormRouter);
app.use('/users', UserRouter);
app.use('/serials', SerialsRouter);

module.exports = app;
