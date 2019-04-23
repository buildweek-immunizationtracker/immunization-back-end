const express = require('express');
const server = express();
const { getUsers, getPatientsByUser, getHistory } = require('../data/helpers');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authenticate = require('../auth/authenticate');

server.use(express.json());
server.use('/', authRoutes);
server.use(authenticate);
server.use('/users', userRoutes);
server.use('/patients', patientRoutes);

module.exports = server;
