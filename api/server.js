const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const checkConsent = require('./middleware/checkConsent');
const authenticate = require('./middleware/authenticate');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/', authRoutes);
server.use(authenticate);
server.use('/patients/:id', checkConsent);
server.use('/user', userRoutes);
server.use('/patients', patientRoutes);

module.exports = server;
