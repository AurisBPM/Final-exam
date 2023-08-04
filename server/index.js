const express = require('express');
const cors = require('cors');
const authRoute = require('./src/routes/auth');
const customersRoute = require('./src/routes/customers');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/', authRoute);
server.use('/', customersRoute);

server.listen(8080, () => {
  console.log('Server runs on port 8080 test');
});
