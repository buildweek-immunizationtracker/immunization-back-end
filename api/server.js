const express = require('express');
const server = express();
const { getUsers, getPatientsByUser, getHistory } = require('../data/helpers');

const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');

server.use(express.json());
server.use('/users', userRoutes);
server.use('/patients', patientRoutes);

module.exports = server;
