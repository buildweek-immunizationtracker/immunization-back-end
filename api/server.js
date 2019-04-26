const express = require('express');
const server = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authenticate = require('./middleware/authenticate');

server.use(express.json());
server.use('/', authRoutes);
server.use(authenticate);
server.use('/user', userRoutes);
server.use('/patients', patientRoutes);

module.exports = server;
