const express = require('express');
const server = express();

// Going to be split into routes
server.use(express.json());

module.exports = server;
