const express = require('express');
const server = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const checkConsent = require('./middleware/checkConsent');
const authenticate = require('./middleware/authenticate');

server.use(express.json());
server.use('/', authRoutes);
server.use(authenticate);
server.use('/patients/:id', checkConsent);
server.use('/user', userRoutes);
server.use('/patients', patientRoutes);

module.exports = server;
