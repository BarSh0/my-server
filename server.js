const { mongoConnect } = require('./config/mongoDB');
const router = require('./router');
const server = require('http').createServer(router);

require('./services/googleSheets.services');

const PORT = 5000;
mongoConnect();
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
